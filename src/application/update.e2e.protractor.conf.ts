import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { ParseOptions, Program, parseScript } from 'esprima';
import { Options, format } from 'prettier';

import { fileReadText } from '../utility/readTree';

import {
  AssignmentExpression,
  ExpressionStatement,
  ObjectExpression,
  Property,
} from 'estree';

const filepath = '/e2e/protractor.conf.js';
const esprimaOption: ParseOptions = {
  range: true,
};
const prettierOption: Options = {
  singleQuote: true,
  trailingComma: 'all',
  parser: 'typescript',
};
const chromeOptions = `,
  chromeOptions: {
    args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
    binary: require('puppeteer').executablePath(),
  }
`;

/**
 * Update to use puppeteer with protractor
 */
export const updateE2eProtractorConf = async (host: Tree) => {
  const sourceText = fileReadText(host, filepath);
  const tree = await parseScript(sourceText, esprimaOption);
  const capabilities = findCapabilities(tree);
  const capValue = capabilities.value as ObjectExpression;
  const pos = capValue.range ? capValue.range[1] - 2 || 0 : 0;

  const recorder = host.beginUpdate(filepath);
  recorder.insertLeft(pos, chromeOptions);
  host.commitUpdate(recorder);

  host.overwrite(
    filepath,
    format(fileReadText(host, filepath), prettierOption),
  );

  return host;
};

function findCapabilities(pg: Program): Property {
  const capabilities = pg.body
    .filter(b => b.type === 'ExpressionStatement')
    .map((exp: ExpressionStatement) => exp.expression)
    .map((aexp: AssignmentExpression) => aexp.right)
    .map((oexp: ObjectExpression) => oexp.properties)
    .reduce(
      (ret, prop) =>
        ret.concat(
          prop.filter(
            p => p.key.type === 'Identifier' && p.key.name === 'capabilities',
          ),
        ),
      [],
    );

  return capabilities[capabilities.length - 1];
}

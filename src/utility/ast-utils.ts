import { findNodes } from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';

export function addImportToTestBed(
  source: ts.SourceFile,
  specPath: string,
  symbolName: string,
): Change[] {
  return _appendToTestBed(source, specPath, symbolName, 'imports');
}

export function addSchemasToTestBed(
  source: ts.SourceFile,
  specPath: string,
  symbolName: string,
): Change[] {
  return _appendToTestBed(source, specPath, symbolName, 'schemas');
}

function _appendToTestBed(
  source: ts.SourceFile,
  specPath: string,
  symbolName: string,
  metadataField: string,
): Change[] {
  const allCalls: ts.CallExpression[] = findNodes(
    source,
    ts.SyntaxKind.CallExpression,
  ) as ts.CallExpression[];

  const configureTestingModuleObjectLiterals = allCalls
    .filter(c => c.expression.kind === ts.SyntaxKind.PropertyAccessExpression)
    .filter(
      (c: any) =>
        c.expression.name.getText(source) === 'configureTestingModule',
    )
    .map(
      c =>
        c.arguments[0].kind === ts.SyntaxKind.ObjectLiteralExpression
          ? c.arguments[0]
          : null,
    ) as ts.Expression[];

  if (configureTestingModuleObjectLiterals.length > 0) {
    const startPosition = configureTestingModuleObjectLiterals[0]
      .getFirstToken(source)
      .getEnd();

    return [
      new InsertChange(
        specPath,
        startPosition,
        `\n      ${metadataField}: [${symbolName}],`,
      ),
    ];
  } else {
    return [];
  }
}

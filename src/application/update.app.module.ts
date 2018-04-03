import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import * as ts from 'typescript';
import { fileReadText } from "../utility/readTree";
import { addImportToModule, addSymbolToNgModuleMetadata } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from "@schematics/angular/utility/change";

export const updateAppModueTs = (host: Tree, modulePath: string) => {

  const sourceText = fileReadText(host, modulePath);
  const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

  const changes = addOnsenUI(source, modulePath, 'OnsenModule', 'ngx-onsenui')
    .concat(addCustomElementSchemad(source, modulePath, 'CUSTOM_ELEMENTS_SCHEMA', '@angular/core'));

  const recorder = host.beginUpdate(modulePath);
  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  host.commitUpdate(recorder);

}

function addOnsenUI(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string) {
  return addImportToModule(source as any, modulePath,
    classifiedName,
    importPath);
}

function addCustomElementSchemad(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string) {
  return addSymbolToNgModuleMetadata(source, modulePath, 'schemas', classifiedName, importPath);
}

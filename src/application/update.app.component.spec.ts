import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import * as ts from 'typescript';
import { fileReadText } from "../utility/readTree";
import { InsertChange } from "@schematics/angular/utility/change";
import { addImportToTestBed, addSchemasToTestBed } from "../utility/ast-utils";
import { insertImport } from '@schematics/angular/utility/route-utils';

export const updateAppComponentSpecTs = (host: Tree, modulePath: string) => {

  const sourceText = fileReadText(host, modulePath);
  const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

  const changes= [
    insertImport(source, modulePath, 'OnsenModule', 'ngx-onsenui'),
    insertImport(source, modulePath, 'CUSTOM_ELEMENTS_SCHEMA', '@angular/core'),
    ...addImportToTestBed(source, modulePath, 'OnsenModule'),
    ...addSchemasToTestBed(source, modulePath, 'CUSTOM_ELEMENTS_SCHEMA'),
  ];
  
  const recorder = host.beginUpdate(modulePath);

  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  }
  host.commitUpdate(recorder);
  return host;
}

import { IModelOptions } from '@typegoose/typegoose/lib/types';
import dbConnection from './mongo';

export function getSchemaOptions() {
  return {
    existingConnection: dbConnection(),
    options: {
      runSyncIndexes: true,
    },
    schemaOptions: {
      timestamps: true,
    },
  };
}


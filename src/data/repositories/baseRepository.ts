import { QueryResult } from 'pg';
import db, { DbCallback } from '../databaseSetup';

export interface BaseRepository<T, TCreation> {
  get: RepositoryGet<T>;
  add: RepositoryAdd<TCreation>;
  find: RepositoryFind<T>;
}

export interface RepositoryReturnObject<T> {
  rows: () => T[];
  any: () => boolean;
  first: () => T | null;
}

interface RepositoryGet<T> {
  (): Promise<T[]>;
}

interface RepositoryAdd<Type> {
  (entity: Type): void;
}

interface RepositoryFind<T> {
  (query: string): Promise<T[]>;
}

const baseRepository = <T, TCreation>(table: string): BaseRepository<T, TCreation> => {
  function createGet() {
    async function get<T>(): Promise<T[]> {
      const { rows } = await db.query<T>(`SELECT * FROM ${table}`);
      return rows;
    }
    return get;
  }
  function createAdd() {
    async function add<TCreation extends Record<string, any>>(entity: TCreation) {
      const keys = Object.keys(entity);
      const values = keys.map((key) => entity[key]);
      let valueString = '';
      values.forEach((value, index) => {
        valueString += `'${value}'${index < values.length - 1 ? ',' : ''}`;
      });
      const keyString = keys.join(',');
      console.log(values, keyString);
      await db.query(`Insert into ${table}(${keyString}) values(${valueString})`);
    }
    return add;
  }

  function createFind() {
    async function find<T>(query: string): Promise<T[]> {
      const { rows } = await db.query<T>(`SELECT * FROM ${table} WHERE ${query}`);
      return rows;
    }
    return find;
  }

  const repositoryReturnObject = function <T>(rows: T[]): RepositoryReturnObject<T> {
    return {
      rows: () => (rows && rows.length ? rows : ([] as T[])),
      any: () => (rows && rows.length ? true : false),
      first: () => (rows && rows.length ? rows[0] : null),
    };
  };

  return {
    get: createGet(),
    add: createAdd(),
    find: createFind(),
  };
};

export default baseRepository;

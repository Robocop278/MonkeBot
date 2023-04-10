export interface MonkeCommand {
  lookUp: string | RegExp;
  crits?: CommandCrit[];
  media?: string;
  Action?(): void | string;
}

export interface CommandCrit {
  percentChance: number;
  comparatorType: Comparator;
  media?: string;
  Action?(): void | string;
}

export enum Comparator {
  LessThan,
  GreaterThan,
  LessThanOrEqualTo,
  GreaterThanOrEqualTo,
}

export const test: MonkeCommand[] = [
  {
    lookUp: 'lean',
    media: 'https://monke.s3.amazonaws.com/polar-lean.ogg',
  },
  {
    lookUp: /^e$/i,
    media: 'https://monke.s3.amazonaws.com/e-long.ogg',
    crits: [
      {
        percentChance: 0.95,
        comparatorType: Comparator.GreaterThanOrEqualTo,
        media: 'https://monke.s3.amazonaws.com/e+crit.ogg',
      },
    ],
  },
];

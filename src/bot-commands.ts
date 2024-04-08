interface CommandBase {
  weight?: number
}

export interface MonkeCommand extends CommandBase {
  lookUp: string | RegExp;
  content: ActionableCommand[];

  Action?(): void | string;
}

export interface ReplyCommand extends CommandBase {
  text_content: string;
}

export interface MediaCommand extends CommandBase {
  media_url: string;
}

export type ActionableCommand = MonkeCommand | ReplyCommand | MediaCommand;

export const test: MonkeCommand[] = [
  ///////////////////////////////////
  //                               //
  //    We do a little trolling    //
  //                               //
  ///////////////////////////////////
  {
    lookUp: /^!monke commands$/i,
    content: [{
      text_content: 'https://cdnmetv.metv.com/z50xp-1619719725-16226-list_items-no.jpg'
    }]
  },
  {
    lookUp: 'lean',
    content: [{
      media_url: 'https://monke.s3.amazonaws.com/polar-lean.ogg'
    }]
  },
  {
    lookUp: /^e$/i,
    content: [{
      media_url: 'https://monke.s3.amazonaws.com/e-long.ogg',
      weight: 19
    },
    {
      media_url: 'https://monke.s3.amazonaws.com/e+crit.ogg'
    }]
  },
  {
    lookUp: /YYYY/,
    content: [{
      media_url: 'https://monke.s3.amazonaws.com/YYYY.mp3'
    }]
  }
];

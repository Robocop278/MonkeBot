interface CommandBase {
  weight?: number
}

export interface RootCommand {
  lookUp: string | RegExp;
  command: ActionableCommand;
}

export interface GroupCommand extends CommandBase {
  content: ActionableCommand[];
  executeAll?: boolean;
}

export interface SequenceCommand extends CommandBase {
  sequence: ActionableCommand[];
  sequenceId: string;
}

export interface ReplyCommand extends CommandBase {
  text_content: string;
}

export interface MediaCommand extends CommandBase {
  media_url: string;
}

export type ActionableCommand = GroupCommand | SequenceCommand | ReplyCommand | MediaCommand;

export const test: RootCommand[] = [
  ///////////////////////////////////
  //                               //
  //    We do a little trolling    //
  //                               //
  ///////////////////////////////////
  {
    lookUp: /^!monke commands$/i,
    command: {
      text_content: 'https://cdnmetv.metv.com/z50xp-1619719725-16226-list_items-no.jpg'
    }
  },
  {
    lookUp: /howdy/i,
    command: {
      text_content: 'Howdy partner :cowboy:'
    }
  },
  {
    lookUp: /amon?g\s*us/i,
    command: {
      content: [{
        text_content: 'ඞ',
        weight: 19
      },
      {
        text_content: '⣿⣿⠟⢹⣶⣶⣝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⡟⢰⡌⠿⢿⣿⡾⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⢸⣿⣤⣒⣶⣾⣳⡻⣿⣿⣿⣿⡿⢛⣯⣭⣭⣭⣽⣻⣿⣿\n⣿⣿⢸⣿⣿⣿⣿⢿⡇⣶⡽⣿⠟⣡⣶⣾⣯⣭⣽⣟⡻⣿⣷⡽\n⣿⣿⠸⣿⣿⣿⣿⢇⠃⣟⣷⠃⢸⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣇⢻⣿⣿⣯⣕⠧⢿⢿⣇⢯⣝⣒⣛⣯⣭⣛⣛⣣⣿⣿⣿\n⣿⣿⣿⣌⢿⣿⣿⣿⣿⡘⣞⣿⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣦⠻⠿⣿⣿⣷⠈⢞⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣗⠄⢿⣿⣿⡆⡈⣽⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡿⣻⣽⣿⣆⠹⣿⡇⠁⣿⡼⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟\n⠿⣛⣽⣾⣿⣿⠿⠋⠄⢻⣷⣾⣿⣧⠟⣡⣾⣿⣿⣿⣿⣿⣿⡇\n⡟⢿⣿⡿⠋⠁⣀⡀⠄⠘⠊⣨⣽⠁⠰⣿⣿⣿⣿⣿⣿⣿⡍⠗\n⣿⠄⠄⠄⠄⣼⣿⡗⢠⣶⣿⣿⡇⠄⠄⣿⣿⣿⣿⣿⣿⣿⣇⢠\n⣝⠄⠄⢀⠄⢻⡟⠄⣿⣿⣿⣿⠃⠄⠄⢹⣿⣿⣿⣿⣿⣿⣿⢹\n⣿⣿⣿⣿⣧⣄⣁⡀⠙⢿⡿⠋⠄⣸⡆⠄⠻⣿⡿⠟⢛⣩⣝⣚\n⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣤⣤⣾⣿⣿⣄⠄⠄⠄⣴⣿⣿⣿⣇\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⡀⠛⠿⣿⣫⣾'
      }]
    }
  },
  {
    lookUp: 'lean',
    command: {
      media_url: 'https://monke.s3.amazonaws.com/polar-lean.ogg'
    }
  },
  {
    lookUp: /^e$/i,
    command: {
      content: [{
        media_url: 'https://monke.s3.amazonaws.com/e-long.ogg',
        weight: 19
      },
      {
        media_url: 'https://monke.s3.amazonaws.com/e+crit.ogg'
      }]
    }
  },
  {
    lookUp: /bwop/,
    command: {
      media_url: 'https://www.youtube.com/watch?v=EIA1iX7Ooz8'
    }
  },
  {
    lookUp: /YYYY/,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/YYYY.mp3'
    }
  },
  {
    lookUp: /bad|bone/,
    command: {
      content: [
        {
          media_url: 'https://monke.s3.amazonaws.com/bad to the bone normal.mp3',
          weight: 70
        },
        {
          media_url: 'https://monke.s3.amazonaws.com/bad to the bone quiet.mp3',
          weight: 30
        },
        {
          executeAll: true,
          content: [
            {
              media_url: 'https://monke.s3.amazonaws.com/bad to the bone ear rape.wav'
            },
            {
              text_content: 'https://tenor.com/view/esqueleto-gif-24452082'
            }
          ]
        }
      ]
    }
  },
  {
    lookUp: /dubious|creature/i,
    command: {
      sequenceId: 'dubious',
      sequence: [
        {
          content: [
            {
              media_url: 'https://monke.s3.amazonaws.com/dubiousCreature-01.wav',
              weight: 7
            },
            {
              media_url: 'https://monke.s3.amazonaws.com/dubiousCreature-01-crit.wav',
              weight: 3
            }
          ]
        },
        {
          content: [
            {
              media_url: 'https://monke.s3.amazonaws.com/dubiousCreature-02.wav',
              weight: 7
            },
            {
              media_url: 'https://monke.s3.amazonaws.com/dubiousCreature-02-crit.wav',
              weight: 3
            }
          ]
        }
      ]
    }
  }
];

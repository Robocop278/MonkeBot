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

export interface ReactCommand extends CommandBase {
  reaction: string;
}

export type ActionableCommand = GroupCommand | SequenceCommand | ReplyCommand | MediaCommand | ReactCommand;

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
    lookUp: /boner/i,
    command: {
      content: [
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+-3.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+-2.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+-1.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+0.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+1.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+2.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/boner/boner+3.ogg' },
      ]
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
  },
  {
    lookUp: /boof/i,
    command: {
      content: [
        {
          text_content: "https://c.tenor.com/jcjQaLHIG_YAAAAd/have-boof.gif"
        },
        {
          text_content: "https://c.tenor.com/XX7_VZxPgw8AAAAd/forgot-the-boof.gif"
        },
        {
          text_content: "https://c.tenor.com/88KcKzh9LrUAAAAC/judgement-judgeeyes.gif"
        }
      ]
    }
  },
  {
    lookUp: /how\s*to\s*spoon/i,
    command: {
      sequenceId: 'how-to-spoon',
      sequence: [
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon1.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon2.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon3.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon4.ogg' }
      ]
    }
  },
  {
    lookUp: /shart/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/shart.mp3'
    }
  },
  {
    lookUp: /b(o|u)rgir/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/borgir.mp3'
    }
  },
  {
    lookUp: /sax\s*(and|&)\s*sex/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/Sax & Sex - Simply the best.mp3'
    }
  },
  {
    lookUp: /the entire shrek movie/i,
    command: {
      content: [
        {
          executeAll: true,
          content: [
            {
              media_url: 'https://monke.s3.amazonaws.com/The Entire Shrek Movie.mp3'
            },
            {
              text_content: 'https://i.redd.it/4vwc2telggr21.gif'
            }
          ]
        },
        {
          media_url: 'https://monke.s3.amazonaws.com/shrek retold.mp3'
        }
      ]
    }
  },
  {
    lookUp: /doodle.*dip/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/doodledip.mp3'
    }
  },
  {
    lookUp: /luck/i,
    command: {
      content: [
        {
          media_url: 'https://monke.s3.amazonaws.com/luckluckluck.wav'
        },
        {
          media_url: 'https://monke.s3.amazonaws.com/luck.mp3'
        }
      ]
    }
  },
  {
    lookUp: /bee/i,
    command: {
      content: [
        {
          reaction: '🐝',
          weight: 19
        },
        {
          executeAll: true,
          content: [
            {
              media_url: 'https://www.youtube.com/watch?v=8CvqmD0CZao'
            },
            {
              text_content: 'https://media.discordapp.net/attachments/102109460914257920/760394085017583676/beeParrot.gif'
            }
          ]
        }
      ]
    }
  }
];

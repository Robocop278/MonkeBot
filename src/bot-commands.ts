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

export interface S3FolderCommand extends CommandBase {
  bucket_folder: string;
}

export type ActionableCommand = GroupCommand | SequenceCommand | ReplyCommand | MediaCommand | ReactCommand | S3FolderCommand;

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
      content: [
        {
          media_url: 'https://monke.s3.amazonaws.com/polar-lean.ogg',
          weight: 8
        },
        {
          media_url: 'https://www.youtube.com/watch?v=P1zOBJYKUBc'//, '5' //as in at 5 seconds
        }
      ]
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
    lookUp: /tenor.*(autism.*creature|yipp?(e|i)e?)/i,
    command: {
      media_url: "https://monke.s3.amazonaws.com/yippee/yippee.mp3",
      weight: 70
    }
  },
  {
    lookUp: /yippee/i,
    command: {
      content: [
        {
          weight: 70,
          executeAll: true,
          content: [
            {
              media_url: 'https://monke.s3.amazonaws.com/yippee/yippee.mp3'
            },
            {
              text_content: 'https://tenor.com/view/yippee-gif-25852454'
            }
          ]
        },
        {
          weight: 15,
          media_url: 'https://monke.s3.amazonaws.com/yippee/yippee full.mp3'
        },
        {
          weight: 15,
          media_url: 'https://monke.s3.amazonaws.com/yippee/yippee jazz.mp3'
        }
      ]
    }
  },
  {
    lookUp: /bwop/,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/bwop.mp3'
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
  },
  {
    lookUp: /super\s*mario\s*world/i,
    command: {
      content: [
        {
          media_url: 'https://www.youtube.com/watch?v=waKumDkYrDY',
          weight: 7
        }, {
          media_url: 'https://monke.s3.amazonaws.com/soundclown/dinosaur-land.wav'
        }
      ]
    }
  },
  {
    lookUp: /thx/i,
    command: {
      content: [
        {
          media_url: 'https://monke.s3.amazonaws.com/thx-normal.mp3',
          weight: 6
        },
        {
          media_url: 'https://monke.s3.amazonaws.com/soundclown/thx-crank.wav',
          weight: 4
        }
      ]
    }
  },
  {
    lookUp: /g(od|ah)\s*dam/i,
    command: {
      bucket_folder: 'GahDamn'
    }
  },
  {
    lookUp: /halo/i,
    command: {
      bucket_folder: 'HaloAnnouncer'
    }
  },
  {
    lookUp: /boys\sare\sback/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/boys are back in town (to kill you).mp3'
    }
  },
  {
    lookUp: /bababooey/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/bababooey.wav'
    }
  },
  {
    lookUp: /why/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/why.mp3'
    }
  },
  {
    lookUp: /change\s*da\s*world/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/changeDaWorld.wav'
    }
  },
  {
    lookUp: /rare.*high.*moments/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/rareHighMoments.wav'
    }
  },
  {
    lookUp: /breathing\sin/i,
    command: {
      content: [
        {
          weight: 9,
          media_url: 'https://monke.s3.amazonaws.com/breathing in.mp3'
        },
        {
          media_url: 'https://monke.s3.amazonaws.com/breathing in crit.mp3'
        }
      ]
    }
  },
  {
    lookUp: /DUST|Detroit\s*Urban\s*Survival\s*Training/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/DUST.wav'
    }
  },
  {
    lookUp: /all\sa\s(little|lil)\snuts/i,
    command: {
      text_content: 'https://monke.s3.us-east-1.amazonaws.com/after%20all%2C%20we%27re%20all%20a%20little%20nuts.mp4'
    }
  },
  {
    lookUp: /nuts/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/all_nuts.wav'
    }
  },
  {
    lookUp: /watching.*me/i, // seems like it was deleted TODO Kevin or Lisbin do you know what this was?
    command: {
      text_content: 'https://monke.s3.us-east-1.amazonaws.com/somebody_watching_me.mp3'
    }
  },
  {
    lookUp: /alien/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/JOEL_ANTI_ALIEN_ALARM.ogg'
    }
  },
  {
    lookUp: /rumbling/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/rumbling.mp3'
    }
  },
  {
    lookUp: /cheezy\s*street/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/cheezy_street.mp3'
    }
  }
];

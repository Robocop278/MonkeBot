interface CommandBase {
  weight?: number
}

export interface RootCommand {
  look_up: string | RegExp;
  command: ActionableCommand;
}


export interface GroupCommand extends CommandBase {
  content: ActionableCommand[];
  execute_all?: boolean;
  on_complete?: (rolledWeight: number) => ActionableCommand | void;
}

export type ShCmd = 'update' | 'restart' | 'shutdown';
export interface AdminCommand extends CommandBase {
  shcmd: ShCmd;
}

export interface SequenceCommand extends CommandBase {
  sequence: ActionableCommand[];
  sequence_id: string;
}

export interface TimedSequenceEntry {
  timeout_ms: number;
  command: ActionableCommand;
}
export interface TimedSequenceCommand extends CommandBase {
  timed_sequence: TimedSequenceEntry[];
}

export interface TextMessageCommand extends CommandBase {
  text_content: string;
  reply?: boolean;
}

export interface MediaCommand extends CommandBase {
  media_url: string;
}

export interface ReactCommand extends CommandBase {
  reaction: string;
}

export type FolderType = 'text' | 'audio';
export interface S3FolderCommand extends CommandBase {
  bucket_folder: string;
  type?: FolderType
}

export interface CleanUpCommand extends CommandBase {
  clean_up: boolean;
}

export type ActionableCommand = GroupCommand | AdminCommand | SequenceCommand | TimedSequenceCommand | TextMessageCommand | MediaCommand | ReactCommand | S3FolderCommand | CleanUpCommand;

export const test: RootCommand[] = [

  // admin shit
  {
    look_up: /monke\.app update/i,
    command: {
      shcmd: 'update'
    }
  },
  {
    look_up: /monke\.app restart/i,
    command: {
      shcmd: 'restart'
    }
  },
  {
    look_up: /monke\.app shutdown/i,
    command: {
      shcmd: 'shutdown'
    }
  },

  ///////////////////////////////////
  //                               //
  //    We do a little trolling    //
  //                               //
  ///////////////////////////////////
  {
    look_up: /^!monke commands$/i,
    command: {
      text_content: 'https://cdnmetv.metv.com/z50xp-1619719725-16226-list_items-no.jpg',
      reply: true
    }
  },
  {
    look_up: /howdy/i,
    command: {
      text_content: 'Howdy partner :cowboy:'
    }
  },
  {
    look_up: /amon?g\s*us/i,
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
    look_up: 'lean',
    command: {
      content: [
        {
          media_url: 'https://monke.s3.amazonaws.com/polar-lean.ogg',
          weight: 8
        },
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/I_Love_Lean.ogg'
        }
      ]
    }
  },
  {
    look_up: /intermission/i,
    command: {
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/09%20-%20Intermission.mp3',
          weight: 5
        },
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/intermission%20crit.mp3'
        }
      ]
    }
  },
  {
    look_up: /^e$/i,
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
    look_up: /tenor.*(autism.*creature|yipp?(e|i)e?)/i,
    command: {
      media_url: "https://monke.s3.amazonaws.com/yippee/yippee.mp3",
      weight: 70
    }
  },
  {
    look_up: /yippee/i,
    command: {
      content: [
        {
          weight: 70,
          execute_all: true,
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
    look_up: /monke.*suck|monke.*succ/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/fart_with_extra_reverb_reversed.mp3'
    }
  },
  {
    look_up: /bwop/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/bwop.mp3'
    }
  },
  {
    look_up: /clash.*royale|clashr/i,
    command: {
      content: [
        {
          execute_all: true,
          content: [
            {
              media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_crying_01_dl.ogg'
            },
            {
              reply: true,
              text_content: 'https://media.tenor.com/s6Y_D_8viO4AAAAM/clash-royale-cry.gif'
            }
          ]
        },
        {
          execute_all: true,
          content: [
            {
              media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_happy_01_dl.ogg'
            },
            {
              reply: true,
              text_content: 'https://tenor.com/7Wej.gif'
            }
          ]
        }, {
          execute_all: true,
          content: [
            {
              media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_laughter_01_dl.ogg'
            },
            {
              reply: true,
              text_content: 'https://tenor.com/xoga.gif'
            }
          ]
        }, {
          execute_all: true,
          content: [
            {
              media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_mad_01_dl.ogg'
            },
            {
              reply: true,
              text_content: 'https://tenor.com/bWWbq.gif'
            }
          ]
        }
      ]
    }
  },
  {
    look_up: /king.*sad|king.*cry/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_crying_01_dl.ogg'
        },
        {
          reply: true,
          text_content: 'https://media.tenor.com/s6Y_D_8viO4AAAAM/clash-royale-cry.gif'
        }
      ]
    }
  },
  {
    look_up: /heheheha|king.*laugh/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_laughter_01_dl.ogg'
        },
        {
          reply: true,
          text_content: 'https://tenor.com/xoga.gif'
        }
      ]
    }
  },
  {
    look_up: /king.*happy/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_happy_01_dl.ogg'
        },
        {
          reply: true,
          text_content: 'https://tenor.com/7Wej.gif'
        }
      ]
    }
  },
  {
    look_up: /king.*mad|king.*angry|king.*rage/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_mad_01_dl.ogg'
        },
        {
          reply: true,
          text_content: 'https://tenor.com/bWWbq.gif'
        }
      ]
    }
  },
  {
    look_up: /hulloo/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/hulloo.ogg'
    }
  },
  {
    look_up: /YYYY/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/YYYY.mp3'
    }
  },
  {
    look_up: /bby.*pit boys/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/BBQ Pit Boys, Blue House - BBQ Shoes.mp3'
    }
  },
  {
    look_up: /(balloon\s*boy|balloonboy|bb)\s*hello/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/bb_sounds/bb_hello.ogg'
    }
  },
  {
    look_up: /(balloon\s*boy|balloonboy|bb)\s*hi/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/bb_sounds/bb_hi.ogg'
    }
  },
  {
    look_up: /(balloon\s*boy|balloonboy|bb)\s*(ha.*ha|laugh)/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/bb_sounds/bb_laugh.ogg'
    }
  },
  {
    look_up: /balloon\s*boy|balloonboy/i,
    command: {
      bucket_folder: 'bb_sounds'
    }
  },
  {
    look_up: /boner/i,
    command: {
      bucket_folder: 'boner'
    }
  },
  {
    look_up: /tt.*(laugh|h(a|e).*h(a|e))/i,
    command: {
      bucket_folder: 'tatl/laugh'
    }
  },
  {
    look_up: /tt.*mama/i,
    command: {
      bucket_folder: 'tatl/mama'
    }
  },
  {
    look_up: /goblin/i,
    command: {
      bucket_folder: 'goblin'
    }
  },
  {
    look_up: /i'?ll\s*kill\s*ya/i,
    command: {
      media_url: "https://monke.s3.us-east-1.amazonaws.com/ill_kill_ya.ogg"
    }
  },
  {
    look_up: /drunke/i,
    command: {
      bucket_folder: 'demoman'
    }
  },
  {
    look_up: /oreo/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/no_more_oreos.ogg'
    }
  },
  {
    look_up: /^ow+$/i,
    command: {
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/oww/oww.ogg',
          weight: 3
        },
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/oww/oww2.ogg',
          weight: 3
        },
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/oww/owwcrit.ogg'
        }
      ]
    }
  },
  {
    look_up: /byeah/i,
    command: {
      bucket_folder: 'byeah'
    }
  },
  {
    look_up: /cleveland/i,
    command: {
      bucket_folder: 'cleveland'
    }
  },
  {
    look_up: /gnome.*yay/i,
    command: {
      bucket_folder: 'gnome/yay'
    }
  },
  {
    look_up: /(ha.*he|gnome.*(laugh|ha.*(ha|he)))/i,
    command: {
      media_url: "https://monke.s3.us-east-1.amazonaws.com/gnome/GNOME%20HAHE.mp3"
    }
  },
  {
    look_up: /(failed|lost) the challenge/i,
    command: {
      media_url: "https://monke.s3.us-east-1.amazonaws.com/gnome/GNOME%20CHALLENGE.mp3"
    }
  },
  {
    look_up: /thank.*you|(^ty)/i,
    command: {
      media_url: "https://monke.s3.us-east-1.amazonaws.com/metal-slug-thank-you-tenkiu.ogg"
    }
  },
  {
    look_up: /hell naw/i,
    command: {
      media_url: "https://monke.s3.us-east-1.amazonaws.com/hell%20naw.ogg"
    }
  },
  {
    look_up: /badumtss/i,
    command: {
      bucket_folder: 'badumtss'
    }
  },
  {
    look_up: /tired.*grandpa/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/imTiredOfThisGrandpa.mp3'
    }
  },
  {
    look_up: /too.*damn.*bad/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/THATSTOODAMNBAD.mp3'
    }
  },
  {
    look_up: /bad|bone/i,
    command: {
      content: [
        {
          media_url: 'https://monke.s3.amazonaws.com/bad to the bone quiet.mp3',
          weight: 70
        },
        {
          media_url: 'https://monke.s3.amazonaws.com/bad to the bone normal.mp3',
          weight: 30
        },
        {
          execute_all: true,
          content: [
            {
              media_url: 'https://monke.s3.amazonaws.com/bad to the bone ear rape.wav'
            },
            {
              text_content: 'https://tenor.com/view/esqueleto-gif-24452082'
            }
          ]
        }
      ],
      on_complete(rolledWeight): ActionableCommand | void {
        function numberToScaryText(num: number): string {
          const digitMap: { [key: string]: string } = {
            '0': 'ꝋ',
            '1': 'ᛑ',
            '2': 'ᘖ',
            '3': 'ᙣ',
            '4': 'ᔦ',
            '5': 'Ҕ',
            '6': 'ᑳ',
            '7': 'ᒉ',
            '8': 'ზ',
            '9': 'ᖗ'
          };

          return num.toString().split('').map(digit => digitMap[digit]).join('');
        }

        let truncatedWeight = Math.trunc(rolledWeight * 100);

        let outputText = numberToScaryText(truncatedWeight);

        if (rolledWeight < (70 / 101)) {
          outputText = "-# " + outputText;
        }
        else if (rolledWeight >= (100 / 101)) {
          outputText = "# ***𝟙𝟘𝟘***\n# **𐌵ᙁ𐌋𐌄𐌀𐌔𐋅 𐌕𐋅𐌄 𐌁Ꝋᙁ𐌄**";
        }

        return { text_content: outputText };
      },
    }
  },
  {
    look_up: /dubious|creature/i,
    command: {
      sequence_id: 'dubious',
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
    look_up: /boof/i,
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
    look_up: /oof/i,
    command: {
      content: [{
        media_url: 'https://monke.s3.amazonaws.com/roblox_oof_slow.ogg',
        weight: 6
      },
      {
        media_url: 'https://monke.s3.amazonaws.com/roblox_oof.ogg'
      }]
    }
  },
  {
    look_up: /how\s*to\s*spoon/i,
    command: {
      sequence_id: 'how-to-spoon',
      sequence: [
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon1.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon2.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon3.ogg' },
        { media_url: 'https://monke.s3.amazonaws.com/howtospoon/howToSpoon4.ogg' }
      ]
    }
  },
  {
    look_up: /shart/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/shart.mp3'
    }
  },
  {
    look_up: /egg/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/egg.ogg'
    }
  },
  {
    look_up: /brerb/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/brerb.ogg'
    }
  },
  {
    look_up: /spi+n|speen/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/speen.ogg'
    }
  },
  {
    look_up: /b(o|u)rgir/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/borgir.mp3'
    }
  },
  {
    look_up: /sax\s*(and|&)\s*sex/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/Sax & Sex - Simply the best.mp3'
    }
  },
  {
    look_up: /the entire shrek movie/i,
    command: {
      content: [
        {
          execute_all: true,
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
    look_up: /doodle.*dip/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/doodledip.mp3'
    }
  },
  {
    look_up: /luck/i,
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
    look_up: /bee/i,
    command: {
      content: [
        {
          reaction: '🐝',
          weight: 19
        },
        {
          execute_all: true,
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
    look_up: /super\s*mario\s*world/i,
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
    look_up: /thx/i,
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
    look_up: /g(od|ah)\s*dam/i,
    command: {
      bucket_folder: 'GahDamn'
    }
  },
  {
    look_up: /sound\s*clown/i,
    command: {
      bucket_folder: 'soundclown'
    }
  },
  {
    look_up: /pickle/i,
    command: {
      bucket_folder: 'pickle'
    }
  },
  {
    look_up: /halo/i,
    command: {
      bucket_folder: 'HaloAnnouncer'
    }
  },
  {
    look_up: /i.*m\s*working\s*on\s*it/i,
    command: {
      bucket_folder: 'im working on it'
    }
  },
  {
    look_up: /juju/i,
    command: {
      bucket_folder: 'jujuOnThatBeat'
    }
  },
  {
    look_up: /boys\sare\sback/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/boys are back in town (to kill you).mp3'
    }
  },
  {
    look_up: /bababooey/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/bababooey.wav'
    }
  },
  {
    look_up: /why/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/why.mp3'
    }
  },
  {
    look_up: /change\s*da\s*world/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/changeDaWorld.wav'
    }
  },
  {
    look_up: /rare.*high.*moments/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/rareHighMoments.wav'
    }
  },
  {
    look_up: /breathing\sin/i,
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
    look_up: /DUST|Detroit\s*Urban\s*Survival\s*Training/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/DUST.wav'
    }
  },
  {
    look_up: /all\sa\s(little|lil)\snuts/i,
    command: {
      text_content: 'https://monke.s3.us-east-1.amazonaws.com/after%20all%2C%20we%27re%20all%20a%20little%20nuts.mp4'
    }
  },
  {
    look_up: /nuts/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/all_nuts.wav'
    }
  },
  {
    look_up: /watching.*me/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/somebody_watching_me.mp3'
    }
  },
  {
    look_up: /alien/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/JOEL_ANTI_ALIEN_ALARM.ogg'
    }
  },
  {
    look_up: /dial.*up/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/dialup.mp3'
    }
  },
  {
    look_up: /rumbling/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/rumbling.mp3'
    }
  },
  {
    look_up: /pumpkin.*cowboy/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/Pumpkin_Cowboy.ogg'
    }
  },
  {
    look_up: /wh?a+h/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/whaaah.mp4'
    }
  },
  {
    look_up: /you.*are.*gay/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/youAreGay.wav'
    }
  },
  {
    look_up: /gay/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/why%20are%20you%20gay.wav'
    }
  },
  {
    look_up: /jeopardy/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/Jeopardy Theme.mp3'
    }
  },
  {
    look_up: /kenna|halloween/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/Michael_Myers_Theme_Song.ogg'
    }
  },
  {
    look_up: /what are you doing on computer/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/what_are_you_doing_on_computer.ogg'
    }
  },
  {
    look_up: /yoda|cock-rock/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/Lego_yoda_death_sound.ogg'
    }
  },
  {
    look_up: /ladder|snake.*eater|sneater/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/Snake_Eater.ogg'
    }
  },


  //Ed Edd Eddy Block

  {
    look_up: /eene.*bird/i,
    command: {
      bucket_folder: 'EEnE/birds'
    }
  },
  {
    look_up: /eene.*monkey/i,
    command: {
      bucket_folder: 'EEnE/monkey'
    }
  },
  {
    look_up: /eene.*orangutan/i,
    command: {
      bucket_folder: 'EEnE/orangutan'
    }
  },
  {
    look_up: /eene.*horse/i,
    command: {
      bucket_folder: 'EEnE/horse'
    }
  },
  {
    look_up: /eene.*impact/i,
    command: {
      bucket_folder: 'EEnE/impact'
    }
  },
  {
    look_up: /eene.*Band Hits/i,
    command: {
      bucket_folder: 'EEnE/Band Hits'
    }
  },
  {
    look_up: /eene.*Title/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE - Episode Title.wav'
    }
  },
  {
    look_up: /eene.*hello/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE Hello.wav'
    }
  },
  {
    look_up: /eene.*slide/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE Slide 2 longer.wav'
    }
  },
  {
    look_up: /eene.*horn/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE THE Horn.wav'
    }
  },
  {
    look_up: /mama/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE Mama Doll.wav'
    }
  },
  {
    look_up: /crow/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEne Crows.wav'
    }
  },
  {
    look_up: /slide.*guitar/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE 88 Fingers Edd.wav'
    }
  },
  {
    look_up: /doors/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE doors.wav'
    }
  },
  {
    look_up: /baby.*gasp/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE Baby Gasp 1.wav'
    }
  },
  {
    look_up: /yodel/i,
    command: {
      media_url: 'https://monke.s3.amazonaws.com/EEnE/EEnE Yodel Goofy.wav'
    }
  },
  {
    look_up: /cheezy\s*street|rat\s*taxi/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/cheezy_street.mp3'
        },
        {
          timed_sequence: [
            {
              command: { text_content: 'https://tenor.com/view/mozzarella-sticks-spinning-mozzarella-sticks-gif-24129498' },
              timeout_ms: 11700
            },
            {
              command: { text_content: 'https://tenor.com/view/nutella-gif-4099928683247293109' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/pesto-mozzarella-crustini-verde-burrata-gif-13144754' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/boba-fett-boba-feta-disney-the-book-of-boba-fett-boba-gif-24410023' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/tom-and-jerry-cheese-one-bite-jerry-mouse-gif-27668294' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rats-rat-dancing-dance-gif-26758028' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-gif-26402521' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-mice-crawling-roaming-gif-4449455' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/master-splinter-gif-11457286' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/remy-gif-18417714' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/butterfly-rat-beautiful-gif-13423696376657218513' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/white-cheese-cheese-chessy-delicious-yummy-gif-12756441' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-wheel-race-gif-11850721' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-wheel-italian-knife-trentino-gif-11362805' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/vanillabizcotti-vanbiz-vanbiztherapper-comedy-memes-gif-21535703' },
              timeout_ms: 666
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-slice-cheddar-oddly-satisfying-gif-3382829' },
              timeout_ms: 666
            },
            {
              command: { text_content: 'https://tenor.com/view/biggie-cheese-biggiecheese-aesthetic-gif-20932775' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/pixel-city-chill-gif-22227473' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/tom-and-jerry-gangster-cats-gif-18913622' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-dancing-rat-dancing-gif-24339527' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/muppets-from-space-rizzo-the-rat-lab-rat-punch-test-gif-27398336' },
              timeout_ms: 21328
            },
            {
              command: { text_content: 'https://tenor.com/view/lost-in-the-maze-oxygen-rat-in-a-maze-where-am-i-finding-the-exit-gif-21612298' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-in-a-maze-oxygen-gotta-escape-find-my-way-out-where-am-i-gif-21612283' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/labirent-maze-labyrinth-gif-10894379' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/exercise-funny-animals-mouse-rat-work-out-gif-17244075' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/work-out-cute-rat-exercise-fitness-gif-17489902' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/ugly-rat-gif-22684958' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/ninju-shino-buff-mice-demon-slayer-demon-slayer-season2-tengen-uzui-gif-24439479' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/taxi-insurance-car-insurance-cheap-taxi-insurance-insurance-company-insurance-in-london-gif-13721155' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-rat-drive-rat-driving-rat-car-gif-26515012' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-mouse-trap-food-hungry-creature-comforts-gif-12489639' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-bologna-siena-gif-22856402' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-verona-lake-garda-gif-22425999' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/mouse-trap-tom-and-jerry-gif-10143379' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/poison-gif-25302299' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/tkt-smart-gif-20642718' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/stiffy-uh-rat-mouse-grooves-gif-16483892' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-ouais-le-rat-rat-de-france-cest%C3%A7a-le-rat-rat-fr352-gif-24643050' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/taxi-insurance-car-insurance-cheap-taxi-insurance-insurance-company-insurance-in-london-gif-13721155' },
              timeout_ms: 13330
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-rat-drive-rat-driving-rat-car-gif-26515012' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-mouse-trap-food-hungry-creature-comforts-gif-12489639' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-bologna-siena-gif-22856402' },
              timeout_ms: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-verona-lake-garda-gif-22425999' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/mouse-trap-tom-and-jerry-gif-10143379' },
              timeout_ms: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cute-peace-fade-bye-awesome-gif-16994521' },
              timeout_ms: 2666
            },
            {
              command: { clean_up: true },
              timeout_ms: 2666
            }
          ]
        }
      ]
    }
  },
  {
    look_up: /sexy\s*hat/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/sexy_hat.mp3'
        },
        {
          timed_sequence: [
            {
              command: { text_content: 'https://tenor.com/view/hovey-benjamin-hovey-benjamin-love-kiss-gif-13271427' },
              timeout_ms: 3000
            },
            {
              command: { text_content: 'https://tenor.com/view/mesh-cap-gif-18676730' },
              timeout_ms: 5132
            },
            {
              command: { text_content: 'https://tenor.com/view/agree-sure-eyebrows-raised-oh-yeah-great-gif-14134262' },
              timeout_ms: 4066
            },
            {
              command: { text_content: 'https://media.tenor.com/VBTAFdK3d1MAAAAC/dog-cute.gif' },
              timeout_ms: 4320
            },
            {
              command: { text_content: 'https://64.media.tumblr.com/0d4539bd961dad74198a2283b51a6372/da83c7c8f6769d24-a4/s500x750/afe80f854baed38d4ab4e997c6b5608b07799c62.gif' },
              timeout_ms: 4066
            },
            {
              command: { text_content: 'https://i.makeagif.com/media/7-10-2015/cAMjHK.gif' },
              timeout_ms: 4066
            },
            {
              command: { text_content: 'https://img1.picmix.com/output/pic/normal/0/8/7/9/12069780_62098.gif' },
              timeout_ms: 4066
            },
            {
              command: { clean_up: true },
              timeout_ms: 2033
            }
          ]
        }
      ]
    }
  },
  {
    look_up: /skyl(?:a|e)r|kazuya\s*guy/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/my_name_is_skyler_white_yo.mp3'
        },
        {
          timed_sequence: [
            {
              command: { bucket_folder: 'kazuya_guy', type: 'text' },
              timeout_ms: 5750
            },
            {
              command: { bucket_folder: 'kazuya_guy', type: 'text' },
              timeout_ms: 2800
            },
            {
              command: { bucket_folder: 'kazuya_guy', type: 'text' },
              timeout_ms: 2200
            },
            {
              command: { text_content: 'https://monke.s3.us-east-1.amazonaws.com/skylarMonke.png' },
              timeout_ms: 2050
            },
            {
              command: { clean_up: true },
              timeout_ms: 1000
            }
          ]
        }
      ]
    }
  },
  {
    look_up: /(?:pedro\s*){3,}/i,
    command: {
      execute_all: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/pedropedropedro.mp3'
        },
        {
          timed_sequence: [
            {
              command: { text_content: 'https://tenor.com/view/mapache-pedro-gif-7206648027763736533' },
              timeout_ms: 1000
            },
            {
              command: { clean_up: true },
              timeout_ms: 12000
            }
          ]
        }
      ]
    }
  }
];

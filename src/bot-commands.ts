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

export interface AdminCommand extends CommandBase {
  shcmd: string;
}

export interface SequenceCommand extends CommandBase {
  sequence: ActionableCommand[];
  sequenceId: string;
}

export interface TimedSequenceEntry {
  timeoutMillisecs: number;
  command: ActionableCommand;
}
export interface TimedSequenceCommand extends CommandBase {
  timedSequence: TimedSequenceEntry[];
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

export interface S3FolderCommand extends CommandBase {
  bucket_folder: string;
}

export type ActionableCommand = GroupCommand | AdminCommand | SequenceCommand | TimedSequenceCommand | TextMessageCommand | MediaCommand | ReactCommand | S3FolderCommand;

export const test: RootCommand[] = [

  // admin shit
  {
    lookUp: /monke\.app update/,
    command: {
      shcmd: 'update'
    }
  },

  ///////////////////////////////////
  //                               //
  //    We do a little trolling    //
  //                               //
  ///////////////////////////////////
  {
    lookUp: /^!monke commands$/i,
    command: {
      text_content: 'https://cdnmetv.metv.com/z50xp-1619719725-16226-list_items-no.jpg',
      reply: true
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
    lookUp: /clash.*royale|clashr/,
    command: {
      bucket_folder: 'Clash Royale'
    }
  },
  {
    lookUp: /heheheha/,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/Clash%20Royale/king_laughter_01_dl.ogg'
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
      bucket_folder: 'boner'
    }
  },
  {
    lookUp: /tt.*laugh/,
    command: {
      bucket_folder: 'tatl/laugh'
    }
  },
  {
    lookUp: /tt.*mama/,
    command: {
      bucket_folder: 'tatl/mama'
    }
  },
  {
    lookUp: /goblin/,
    command: {
      bucket_folder: 'goblin'
    }
  },
  {
    lookUp: /drunke/,
    command: {
      bucket_folder: 'demoman'
    }
  },
  {
    lookUp: /byeah/,
    command: {
      bucket_folder: 'byeah'
    }
  },
  {
    lookUp: /cleveland/,
    command: {
      bucket_folder: 'cleveland'
    }
  },
  {
    lookUp: /gnome.*yay/,
    command: {
      bucket_folder: 'gnome/yay'
    }
  },
  {
    lookUp: /badumtss/,
    command: {
      bucket_folder: 'badumtss'
    }
  },
  {
    lookUp: /tired.*grandpa/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/imTiredOfThisGrandpa.mp3'
    }
  },
  {
    lookUp: /too.*damn.*bad/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/THATSTOODAMNBAD.mp3'
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
    lookUp: /juju/i,
    command: {
      bucket_folder: 'jujuOnThatBeat'
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
    command: {               // found it locally, idk where it went on s3  - KC
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
    lookUp: /wh?a+h/i,
    command: {
      media_url: 'https://monke.s3.us-east-1.amazonaws.com/whaaah.mp4'
    }
  },
  {
    lookUp: /cheezy\s*street|rat\s*taxi/i,
    command: {
      executeAll: true,
      content: [
        {
          media_url: 'https://monke.s3.us-east-1.amazonaws.com/cheezy_street.mp3'
        },
        {
          timedSequence: [
            {
              command: { text_content: 'https://tenor.com/view/mozzarella-sticks-spinning-mozzarella-sticks-gif-24129498' },
              timeoutMillisecs: 11700
            },
            {
              command: { text_content: 'https://tenor.com/view/nutella-gif-4099928683247293109' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/pesto-mozzarella-crustini-verde-burrata-gif-13144754' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/boba-fett-boba-feta-disney-the-book-of-boba-fett-boba-gif-24410023' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/tom-and-jerry-cheese-one-bite-jerry-mouse-gif-27668294' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rats-rat-dancing-dance-gif-26758028' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-gif-26402521' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-mice-crawling-roaming-gif-4449455' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/master-splinter-gif-11457286' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/remy-gif-18417714' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/butterfly-rat-beautiful-gif-13423696376657218513' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/white-cheese-cheese-chessy-delicious-yummy-gif-12756441' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-wheel-race-gif-11850721' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-wheel-italian-knife-trentino-gif-11362805' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/vanillabizcotti-vanbiz-vanbiztherapper-comedy-memes-gif-21535703' },
              timeoutMillisecs: 666
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-slice-cheddar-oddly-satisfying-gif-3382829' },
              timeoutMillisecs: 666
            },
            {
              command: { text_content: 'https://tenor.com/view/biggie-cheese-biggiecheese-aesthetic-gif-20932775' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/pixel-city-chill-gif-22227473' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/tom-and-jerry-gangster-cats-gif-18913622' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-dancing-rat-dancing-gif-24339527' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/muppets-from-space-rizzo-the-rat-lab-rat-punch-test-gif-27398336' },
              timeoutMillisecs: 21328
            },
            {
              command: { text_content: 'https://tenor.com/view/lost-in-the-maze-oxygen-rat-in-a-maze-where-am-i-finding-the-exit-gif-21612298' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-in-a-maze-oxygen-gotta-escape-find-my-way-out-where-am-i-gif-21612283' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/labirent-maze-labyrinth-gif-10894379' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/exercise-funny-animals-mouse-rat-work-out-gif-17244075' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/work-out-cute-rat-exercise-fitness-gif-17489902' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/ugly-rat-gif-22684958' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/ninju-shino-buff-mice-demon-slayer-demon-slayer-season2-tengen-uzui-gif-24439479' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/taxi-insurance-car-insurance-cheap-taxi-insurance-insurance-company-insurance-in-london-gif-13721155' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-rat-drive-rat-driving-rat-car-gif-26515012' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-mouse-trap-food-hungry-creature-comforts-gif-12489639' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-bologna-siena-gif-22856402' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-verona-lake-garda-gif-22425999' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/mouse-trap-tom-and-jerry-gif-10143379' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/poison-gif-25302299' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/tkt-smart-gif-20642718' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/stiffy-uh-rat-mouse-grooves-gif-16483892' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-ouais-le-rat-rat-de-france-cest%C3%A7a-le-rat-rat-fr352-gif-24643050' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/taxi-insurance-car-insurance-cheap-taxi-insurance-insurance-company-insurance-in-london-gif-13721155' },
              timeoutMillisecs: 13330
            },
            {
              command: { text_content: 'https://tenor.com/view/rat-rat-drive-rat-driving-rat-car-gif-26515012' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cheese-mouse-trap-food-hungry-creature-comforts-gif-12489639' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-bologna-siena-gif-22856402' },
              timeoutMillisecs: 2666
            },
            {
              command: { text_content: 'https://tenor.com/view/transfer-verona-lake-garda-gif-22425999' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/mouse-trap-tom-and-jerry-gif-10143379' },
              timeoutMillisecs: 1333
            },
            {
              command: { text_content: 'https://tenor.com/view/cute-peace-fade-bye-awesome-gif-16994521' },
              timeoutMillisecs: 2666
            }
          ]
        }
      ]
    }
  }
];

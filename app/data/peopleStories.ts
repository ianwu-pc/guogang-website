export type StoryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type StoryBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string };

export type PeopleStorySection = {
  heading: string;
  blocks: StoryBlock[];
  image?: StoryImage;
};

export type PeopleStory = {
  slug: string;
  storyNumber: string;
  name: string;
  role: string;
  titleLines: string[];
  subtitleLines: string[];
  description: string;
  heroImage?: StoryImage;
  introBlocks: StoryBlock[];
  sections: PeopleStorySection[];
  ending: { largeLines: string[]; smallLines: string[] };
};

// Transcribed from the six supplied 人與過港 Word documents. Keep source wording and order.
export const PEOPLE_STORIES: PeopleStory[] = [
  {
    "slug": "bottle-cap-grandma",
    "storyNumber": "01",
    "name": "林秀英",
    "role": "",
    "titleLines": [
      "把時間，",
      "一個瓶蓋一個瓶蓋",
      "留在過港。"
    ],
    "subtitleLines": [],
    "description": "她把日子一點一點填滿，而其中一些，也留成了今天的過港。",
    "introBlocks": [
      {
        "type": "quote",
        "text": "「這個也是我做的。」"
      },
      {
        "type": "paragraph",
        "text": "訪談那天，林秀英一張一張翻著手機裡的照片。畫、字、印章、手工，還有參加活動時留下的影像。"
      },
      {
        "type": "paragraph",
        "text": "上一張還沒看完，她已經準備說起下一件作品。我們問她做過多少東西，好像很難真的數清楚。因為一件事情做完，很快又會有下一件。"
      },
      {
        "type": "paragraph",
        "text": "她看見一片葉子，會想著還能怎麼拼；一張畫如果沒有畫成想要的樣子，也捨不得整張丟掉，\n把還能用的部分剪下來，下一次再畫。"
      },
      {
        "type": "paragraph",
        "text": "很多東西到了她手裡，好像都不會太快變成「沒用了」。"
      },
      {
        "type": "quote",
        "text": "「你看，兩隻手都沒有停止下來，就是勞碌命的手。」"
      },
      {
        "type": "paragraph",
        "text": "這雙手，確實很少真正停過。"
      }
    ],
    "sections": [
      {
        "heading": "一雙閒不下來的手",
        "blocks": [
          {
            "type": "paragraph",
            "text": "六十多年前，林秀英嫁來過港。家裡有孩子、有長輩，生活裡總有事情等著做。她原本就學過美髮，等孩子大一些後，便在過港開了一間小小的美髮店。洗頭、剪髮、燙髮，從頭到尾幾乎都是自己來。"
          },
          {
            "type": "paragraph",
            "text": "一做，就是幾十年。"
          },
          {
            "type": "paragraph",
            "text": "長時間重複使用雙手，肩膀也累了，連手指也慢慢留下工作的痕跡。說起那些年，秀英奶奶沒有把它講成什麼特別的故事。只是伸出自己的手給我們看，那些長年工作留下來的痕跡，現在還在。"
          },
          {
            "type": "paragraph",
            "text": "後來不再做美髮，這雙手也沒有因此安靜下來。"
          },
          {
            "type": "paragraph",
            "text": "她本來就喜歡做東西。"
          },
          {
            "type": "paragraph",
            "text": "畫畫、寫字、刻印，做花、做手工，看到什麼可以再利用的材料，總會多想一下："
          },
          {
            "type": "paragraph",
            "text": "是不是還能變成別的東西？"
          },
          {
            "type": "quote",
            "text": "「我們的手這麼大支，什麼也不做，實在很可惜。」"
          },
          {
            "type": "paragraph",
            "text": "對她來說，能做的時候，好像就應該再多做一點。"
          }
        ]
      },
      {
        "heading": "時間不能留白",
        "blocks": [
          {
            "type": "paragraph",
            "text": "六十歲那年，林秀英開始學國畫。"
          },
          {
            "type": "paragraph",
            "text": "其實小時候就喜歡畫畫，只是成家之後，家庭、孩子與工作，自然先把日子填滿了。等手上終於多出一些時間，她就去學畫。"
          },
          {
            "type": "paragraph",
            "text": "畫著畫著，又想學書法。希望自己的畫能自己落款，上面的章也想自己來，於是又去學篆字、刻印。"
          },
          {
            "type": "paragraph",
            "text": "一樣接著一樣。"
          },
          {
            "type": "paragraph",
            "text": "她沒有特別把「六十歲」說成一個人生的分界。比較像是時間來了，那就把以前喜歡、卻沒空做的事情，再慢慢撿回來。"
          },
          {
            "type": "quote",
            "text": "「活到老，學到老。」"
          },
          {
            "type": "paragraph",
            "text": "直到現在，她睡覺以前，還會先想明天起來要先做什麼？接下來還有什麼事情？她說，人的時間沒有想像中那麼多。明明還能學、還能做，卻讓一天就這樣過去，她會覺得可惜。"
          },
          {
            "type": "paragraph",
            "text": "她把這件事說得很直接："
          },
          {
            "type": "quote",
            "text": "「時間不能留白。」"
          }
        ]
      },
      {
        "heading": "牆上的顏色",
        "blocks": [
          {
            "type": "paragraph",
            "text": "有些原本只在家裡做的事，慢慢也跟著林秀英走進社區。"
          },
          {
            "type": "paragraph",
            "text": "有人提出想法，大家一起討論，她就把自己會的東西拿出來。而其中最顯眼的一件，大概就是現在仍留在過港的瓶蓋牆。站在今天的牆前，第一眼看到的是一整片顏色。但最開始，那些顏色都只是散落的瓶蓋。"
          },
          {
            "type": "paragraph",
            "text": "知道社區要收集材料後，居民陸續把瓶蓋拿來。有人今天提一包，隔天又有人送來另一包。瓶蓋得先清洗、曬乾，再按照不同的顏色與深淺，一桶一桶分開。真正開始施工以後，又碰到新的問題。牆面太滑，水泥黏不住，只好拿著榔頭，先把牆面一下一下敲粗。"
          },
          {
            "type": "paragraph",
            "text": "有人敲牆，有人幫忙處理水泥，有空的志工就過來搭一把手。林秀英則站上鷹架，盯著圖案，也盯著每一個顏色應該落下的位置。"
          },
          {
            "type": "paragraph",
            "text": "牆太大，原本請了美術老師協助用電腦構圖。可是她看著看著，總覺得不太對。"
          },
          {
            "type": "quote",
            "text": "「電腦畫的、有點Q版，跟我手畫的感覺完全不一樣。」"
          },
          {
            "type": "paragraph",
            "text": "於是做到一半，又偷偷把圖改成自己覺得對的樣子。接著，一個瓶蓋、一個瓶蓋往上貼。"
          },
          {
            "type": "paragraph",
            "text": "一天又一天。一做，就是兩個多月。"
          }
        ]
      },
      {
        "heading": "很多人的一點時間",
        "blocks": [
          {
            "type": "paragraph",
            "text": "如果瓶蓋牆只寫成「林秀英做了一面牆」，反而少了一些她真正記得的事情。"
          },
          {
            "type": "paragraph",
            "text": "她記得的是居民把材料送來，是有人清洗、分類，是施工的時候，總有人過來幫忙。就像社區裡其他經過她手的東西一樣，很多事情一開始只是一個想法，後來有人出力、有人幫忙，慢慢就成了大家一起做的事。"
          },
          {
            "type": "paragraph",
            "text": "秀英奶奶教過居民畫畫，也曾把自己會的東西帶出去分享。家人甚至曾經笑她："
          },
          {
            "type": "quote",
            "text": "「媽，妳在活動中心的時間，好像比在家裡的時間多。」"
          },
          {
            "type": "paragraph",
            "text": "她自豪地說，很多社區裡的東西都經過她的手，但也總會補上一句："
          },
          {
            "type": "quote",
            "text": "「還好有大家來幫忙。」"
          },
          {
            "type": "paragraph",
            "text": "對她來說，活動中心待久了，也早就不只是「來參加活動」的地方。有事情就往這裡跑，有好東西覺得用得到，也會往這裡送。大家慢慢把這裡，當成自己家裡的一部分。 而一面瓶蓋牆，大概也是這樣長出來的。不是一個人突然做出一件作品，而是很多人，各自把一點點時間放進來，最後，才留成現在看得見的樣子。"
          }
        ]
      },
      {
        "heading": "六十多年，留在過港的日子",
        "blocks": [
          {
            "type": "paragraph",
            "text": "林秀英嫁來過港時，這裡還沒有現在這麼多房子。六十多年過去，她看著房子一棟棟多起來，過港路也慢慢變得熱鬧。"
          },
          {
            "type": "paragraph",
            "text": "而她自己的日子，也一直在這裡往前走。"
          },
          {
            "type": "paragraph",
            "text": "成家、工作，後來參與社區、做作品、當志工。很多事情做久了，好像也很難再分清楚，哪些只是自己的生活，哪些已經成了過港的一部分。"
          },
          {
            "type": "paragraph",
            "text": "外地有人來參訪時，林秀英曾帶著大家在社區裡走，說起基隆河，也說起這些年居民一起做過的事情。"
          },
          {
            "type": "paragraph",
            "text": "談到有人特地來看過港，\n她笑著說："
          },
          {
            "type": "quote",
            "text": "「我為我們過港感覺到一點驕傲，真的。」"
          },
          {
            "type": "paragraph",
            "text": "她說的是「我們過港」。不是只說自己做了什麼，而是想到大家一起把這個地方維持到今天。"
          },
          {
            "type": "paragraph",
            "text": "訪談最後，我們問她，住了這麼多年，過港對她來說是什麼。"
          },
          {
            "type": "paragraph",
            "text": "這一次，她沒有再說作品，也沒有再數自己做過多少事情。"
          },
          {
            "type": "paragraph",
            "text": "只說："
          },
          {
            "type": "quote",
            "text": "「你在一個地方待久了，你就會有感情在這裡。」"
          },
          {
            "type": "paragraph",
            "text": "然後又補了一句："
          },
          {
            "type": "quote",
            "text": "「我在這裡住這麼久了，有感情，我也離不開這裡。」"
          },
          {
            "type": "paragraph",
            "text": "好像也不需要再多解釋什麼。住久了，做久了，生活裡很多重要的事情都發生在這裡。到最後，過港不只是她住了六十多年的地方，也早已成了她生活裡分不開的一部分。"
          }
        ]
      },
      {
        "heading": "時間留下來的形狀",
        "blocks": [
          {
            "type": "paragraph",
            "text": "瓶蓋放久了，顏色也許會慢慢褪。牆面再過很多年，也會留下風吹雨打的痕跡。"
          },
          {
            "type": "paragraph",
            "text": "但那面牆真正留下來的，從來不只有瓶蓋。還有曾經有人提著一袋材料走進社區，有人坐下來分類顏色，有人敲牆、拌水泥，有人站上鷹架，把自己一天裡的一點時間，留在同一個地方。"
          },
          {
            "type": "paragraph",
            "text": "而林秀英留在過港的時間，早已比那兩個多月更長。六十多年。一個家、一間美髮店、一間活動中心，一張畫、一顆印章、一面牆。很多事情發生的時候都很小。小到不一定會特別記得是哪一天完成的。可是當日子一件一件疊起來，再回頭看，那些生活過的痕跡，已經慢慢成了地方的一部分。"
          },
          {
            "type": "paragraph",
            "text": "她把可以用的東西留下來，把還想學的事情學起來，也把自己做得到的一點一點，留在過港。"
          },
          {
            "type": "paragraph",
            "text": "一個瓶蓋很小，一天也很短。"
          },
          {
            "type": "paragraph",
            "text": "可是六十多年過去，\n那些一點一點留下來的時間，早已在過港有了形狀。"
          }
        ]
      }
    ],
    "ending": {
      "largeLines": [
        "「時間不能留白。」"
      ],
      "smallLines": [
        "她把日子一點一點填滿，",
        "而其中一些，",
        "也留成了今天的過港。"
      ]
    }
  },
  {
    "slug": "breakfast-shop-owner",
    "storyNumber": "02",
    "name": "早餐店老闆娘",
    "role": "",
    "titleLines": [
      "二十五年，",
      "早晨裡的人",
      "慢慢熟了。"
    ],
    "subtitleLines": [],
    "description": "有些關係，一開始只是每天來買一份早餐。來久了，就熟了。",
    "introBlocks": [
      {
        "type": "quote",
        "text": "「喜歡喔？\n好累喔，不喜歡。」"
      },
      {
        "type": "paragraph",
        "text": "問她做了二十五年的早餐店，\n到現在還喜不喜歡，\n她回答得很快。"
      },
      {
        "type": "paragraph",
        "text": "接著又補了一句："
      },
      {
        "type": "quote",
        "text": "「可是還是得做啊，\n要賺錢耶，很現實的問題耶。」"
      },
      {
        "type": "paragraph",
        "text": "她沒有把每天四點多起床、\n五點以前到店裡，\n說成一件多了不起的事情。"
      },
      {
        "type": "paragraph",
        "text": "以前要工作，\n要養孩子，\n所以該起床就起床，\n該做的事情就做。"
      },
      {
        "type": "paragraph",
        "text": "只是這樣的早晨，\n一天一天過下來，\n原本來買早餐的人，\n漸漸有了名字；\n原本只是站在櫃檯前的客人，\n後來也成了朋友。"
      }
    ],
    "sections": [
      {
        "heading": "天還沒亮",
        "blocks": [
          {
            "type": "paragraph",
            "text": "每天早上四點多，\n她就得起床。"
          },
          {
            "type": "paragraph",
            "text": "五點以前到店裡，\n先煎肉、煎蛋，\n再把三明治一份一份做好。"
          },
          {
            "type": "paragraph",
            "text": "有些客人趕著上班、上課，\n東西先準備好，\n來了拿著就能走。"
          },
          {
            "type": "paragraph",
            "text": "二十五年來，\n早餐店的早晨大多是這樣開始的。"
          },
          {
            "type": "paragraph",
            "text": "但她一開始，\n做的並不是早餐。"
          },
          {
            "type": "paragraph",
            "text": "年輕的時候，\n她做電腦輸入的工作。"
          },
          {
            "type": "paragraph",
            "text": "後來因為常去幫舅媽的早餐店，\n幫著幫著，\n該做的事情也慢慢學會了。"
          },
          {
            "type": "paragraph",
            "text": "舅媽就問她："
          },
          {
            "type": "quote",
            "text": "「不然你也出來做，\n反正你都會了。」"
          },
          {
            "type": "paragraph",
            "text": "她的回答也很簡單。"
          },
          {
            "type": "paragraph",
            "text": "好吧。"
          },
          {
            "type": "paragraph",
            "text": "後來原本工作的地方租約到了，\n她請人幫忙找店面。"
          },
          {
            "type": "paragraph",
            "text": "找了一陣子，\n舅媽剛好看到過港這間小店，\n叫她過來看看。"
          },
          {
            "type": "paragraph",
            "text": "店不大，\n價格還負擔得起，\n她乾脆把它買了下來。"
          },
          {
            "type": "paragraph",
            "text": "問她為什麼會選過港，\n她只說："
          },
          {
            "type": "quote",
            "text": "「因緣際會。」"
          },
          {
            "type": "paragraph",
            "text": "沒有特別計畫要來這裡。"
          },
          {
            "type": "paragraph",
            "text": "但這一來，\n就是二十五年。"
          }
        ]
      },
      {
        "heading": "就是生活",
        "blocks": [
          {
            "type": "paragraph",
            "text": "做早餐有沒有什麼祕訣？"
          },
          {
            "type": "paragraph",
            "text": "她想了一下，\n好像不覺得這是一個很難回答的問題。"
          },
          {
            "type": "paragraph",
            "text": "照程序做，\n該清的地方清乾淨，\n做給客人吃的東西，\n自己也得敢吃。"
          },
          {
            "type": "quote",
            "text": "「我們自己做、我們敢吃的，\n你就敢給客人吃。」"
          },
          {
            "type": "paragraph",
            "text": "再問她有沒有什麼\n特別厲害的手藝，\n她反而笑了。"
          },
          {
            "type": "quote",
            "text": "「我不是什麼達人啦，\n就是生活而已。」"
          },
          {
            "type": "paragraph",
            "text": "對她來說，\n早餐店並沒有什麼神祕的地方。"
          },
          {
            "type": "paragraph",
            "text": "做了一輩子的工作，\n知道今天有哪些事情要做，\n一件一件做好，\n一天也就過去了。"
          },
          {
            "type": "paragraph",
            "text": "以前是為了生活，\n為了養孩子。"
          },
          {
            "type": "quote",
            "text": "「該扛的責任、該做的，\n我們就乖乖的，\n該做的就乖乖的。」"
          },
          {
            "type": "paragraph",
            "text": "她講得很平常。"
          },
          {
            "type": "paragraph",
            "text": "可是二十五年，\n其實就是由很多這樣"
          },
          {
            "type": "paragraph",
            "text": "「沒什麼特別」的日子組成的。"
          }
        ]
      },
      {
        "heading": "每天都會來的人",
        "blocks": [
          {
            "type": "paragraph",
            "text": "早餐店不大。"
          },
          {
            "type": "paragraph",
            "text": "她反而覺得，\n小店有小店的好處。"
          },
          {
            "type": "paragraph",
            "text": "客人差不多就是那些人，\n來久了，\n大家都認識。"
          },
          {
            "type": "paragraph",
            "text": "點完早餐，\n有時候就站著多說幾句。"
          },
          {
            "type": "paragraph",
            "text": "今天誰怎麼了，\n昨天發生什麼事，\n聊完，\n再各自去忙。"
          },
          {
            "type": "paragraph",
            "text": "她說："
          },
          {
            "type": "quote",
            "text": "「跟客人聊天，\n這個就是這種小店的好處。」"
          },
          {
            "type": "paragraph",
            "text": "有人買了東西，\n會順便拿一點給她吃；\n她手邊有什麼，\n也會和大家分享。"
          },
          {
            "type": "paragraph",
            "text": "你給我一點，\n我再拿一點給你。"
          },
          {
            "type": "paragraph",
            "text": "時間久了，\n原本只是做生意的關係，\n慢慢沒有分得那麼清楚。"
          },
          {
            "type": "quote",
            "text": "「我們這裡的客人、左右鄰居，\n其實很多很多很多，\n都是很熟、很要好的客人。」"
          },
          {
            "type": "paragraph",
            "text": "最後她自己把這件事\n說得很簡單："
          },
          {
            "type": "quote",
            "text": "「客人變成好朋友。」"
          },
          {
            "type": "paragraph",
            "text": "二十五年前，\n她來這裡是開早餐店。"
          },
          {
            "type": "paragraph",
            "text": "大概沒有想過，\n有一天最大的收穫之一，\n會是一群朋友。"
          }
        ]
      },
      {
        "heading": "從阿姨到阿嬤",
        "blocks": [
          {
            "type": "paragraph",
            "text": "二十五年，\n也足夠讓一個小孩長大。"
          },
          {
            "type": "paragraph",
            "text": "她記得以前有不少孩子，\n小小的就會來店裡。"
          },
          {
            "type": "paragraph",
            "text": "看到他們要去上學，\n她有時會順口喊一句："
          },
          {
            "type": "paragraph",
            "text": "走旁邊一點，\n注意車子。"
          },
          {
            "type": "paragraph",
            "text": "不是誰交代她要管。"
          },
          {
            "type": "paragraph",
            "text": "只是小社區裡，\n孩子看久了，\n好像自然就會多顧一下。"
          },
          {
            "type": "paragraph",
            "text": "她說："
          },
          {
            "type": "quote",
            "text": "「對別人家的小孩子，\n也是跟自己的小孩子一樣啊。」"
          },
          {
            "type": "paragraph",
            "text": "有些孩子很皮，\n該提醒的，\n她還是會提醒。"
          },
          {
            "type": "quote",
            "text": "「上學要注意、\n走旁邊一點，\n你都要交代一聲。」"
          },
          {
            "type": "paragraph",
            "text": "後來，\n那些孩子真的一個一個長大了。"
          },
          {
            "type": "paragraph",
            "text": "讀書，\n工作，\n成家，\n有人甚至帶著自己的孩子\n再回到店裡。"
          },
          {
            "type": "paragraph",
            "text": "問她這種情形多不多，\n她馬上回答："
          },
          {
            "type": "quote",
            "text": "「很多，很多。」"
          },
          {
            "type": "paragraph",
            "text": "以前那些孩子見到她，\n一聲一聲喊「阿姨」。"
          },
          {
            "type": "paragraph",
            "text": "喊著喊著，\n有人開始叫她姨媽，\n又有人直接叫她阿嬤。"
          },
          {
            "type": "paragraph",
            "text": "她笑說："
          },
          {
            "type": "quote",
            "text": "「我當阿嬤了耶。」"
          },
          {
            "type": "paragraph",
            "text": "自己的女兒還沒有讓她當阿嬤，\n倒是早餐店裡，\n先出現了一群別人家的孫子。"
          },
          {
            "type": "paragraph",
            "text": "我們原本問她，\n看著這些孩子長大，\n會不會很感動。"
          },
          {
            "type": "paragraph",
            "text": "她沒有順著說。"
          },
          {
            "type": "paragraph",
            "text": "只是笑著回答："
          },
          {
            "type": "quote",
            "text": "「也是我看大的孩子。」"
          },
          {
            "type": "paragraph",
            "text": "二十五年的時間，\n好像就藏在這句話裡。"
          },
          {
            "type": "paragraph",
            "text": "不用真的去算過了幾年。"
          },
          {
            "type": "paragraph",
            "text": "看看以前的小孩\n現在牽著誰回來，\n就知道了。"
          }
        ]
      },
      {
        "heading": "十五分鐘的路",
        "blocks": [
          {
            "type": "paragraph",
            "text": "其實，\n她一直都不住在過港。"
          },
          {
            "type": "paragraph",
            "text": "她住在安樂區，\n靠近長庚醫院那一帶。"
          },
          {
            "type": "paragraph",
            "text": "每天騎車來，\n大約十五分鐘。"
          },
          {
            "type": "paragraph",
            "text": "工作結束以後，\n她還是會沿著同一條路回家。"
          },
          {
            "type": "paragraph",
            "text": "可是說起朋友，\n她卻說："
          },
          {
            "type": "quote",
            "text": "「這邊的朋友\n比我住的那裡的朋友還多。」"
          },
          {
            "type": "paragraph",
            "text": "住家的大樓，\n大家回去以後各自把門關起來。"
          },
          {
            "type": "paragraph",
            "text": "她說："
          },
          {
            "type": "quote",
            "text": "「一回去根本沒有鄰居。」"
          },
          {
            "type": "paragraph",
            "text": "早餐店正好相反。"
          },
          {
            "type": "paragraph",
            "text": "每天鐵門一開，\n人就開始進進出出。"
          },
          {
            "type": "paragraph",
            "text": "有人來買早餐，\n有人經過，\n順便打聲招呼；\n熟一點的，\n乾脆站下來聊幾句。"
          },
          {
            "type": "paragraph",
            "text": "她沒有住在過港，\n卻在二十五年的早晨裡，\n認識了一個又一個過港的人。"
          },
          {
            "type": "paragraph",
            "text": "問她，\n這個地方對自己來說是什麼，\n她說："
          },
          {
            "type": "quote",
            "text": "「很有人情味的地方。」"
          },
          {
            "type": "paragraph",
            "text": "再問早餐店和過港\n到底是什麼關係，\n她想了一會兒："
          },
          {
            "type": "quote",
            "text": "「我來這邊是跟他們有緣。」"
          },
          {
            "type": "paragraph",
            "text": "接著，\n又回到她一直說的那句話："
          },
          {
            "type": "quote",
            "text": "「從客人變成朋友。」"
          }
        ]
      },
      {
        "heading": "還是每天來",
        "blocks": [
          {
            "type": "paragraph",
            "text": "以前，\n每天來店裡的理由很明確。"
          },
          {
            "type": "paragraph",
            "text": "賺錢，\n養孩子。"
          },
          {
            "type": "paragraph",
            "text": "現在女兒已經長大，\n有些以前壓在生活裡的事情，\n也不需要再那麼操心。"
          },
          {
            "type": "paragraph",
            "text": "那為什麼還繼續開？"
          },
          {
            "type": "paragraph",
            "text": "她說，\n如果現在什麼都不做，\n怕自己反而退化得更快。"
          },
          {
            "type": "paragraph",
            "text": "而且來到店裡，\n還有人可以說話。"
          },
          {
            "type": "quote",
            "text": "「以前為了賺錢，\n要養小孩子；\n現在小孩子大了，\n不用我養。」"
          },
          {
            "type": "paragraph",
            "text": "停了一下，\n她說："
          },
          {
            "type": "quote",
            "text": "「現在是來這邊\n跟這些人打屁。」"
          },
          {
            "type": "paragraph",
            "text": "說穿了，\n煎台還是同一個煎台。"
          },
          {
            "type": "paragraph",
            "text": "每天一樣要早起，\n一樣有做不完的早餐。"
          },
          {
            "type": "paragraph",
            "text": "可是站在煎台另一邊的人，\n已經和以前不太一樣了。"
          },
          {
            "type": "paragraph",
            "text": "以前是客人。"
          },
          {
            "type": "paragraph",
            "text": "後來是熟客。"
          },
          {
            "type": "paragraph",
            "text": "再後來，\n是今天沒有看到，\n可能還會問一句："
          },
          {
            "type": "paragraph",
            "text": "怎麼沒來的人。"
          }
        ]
      },
      {
        "heading": "從客人變成朋友",
        "blocks": [
          {
            "type": "paragraph",
            "text": "訪談快結束時，\n我們問她，\n如果要用一種味道\n形容這些年在過港的感覺，\n她一開始其實沒有答案。"
          },
          {
            "type": "quote",
            "text": "「比較沒有想到那麼多。」"
          },
          {
            "type": "paragraph",
            "text": "我們又問了幾次。"
          },
          {
            "type": "paragraph",
            "text": "甜的？"
          },
          {
            "type": "paragraph",
            "text": "鹹的？"
          },
          {
            "type": "paragraph",
            "text": "還是其他味道？"
          },
          {
            "type": "paragraph",
            "text": "最後，\n她忽然說："
          },
          {
            "type": "quote",
            "text": "「人都很甜，\n東西是賣鹹的比較多。」"
          },
          {
            "type": "paragraph",
            "text": "大家都笑了。"
          },
          {
            "type": "paragraph",
            "text": "這句話不是她事先準備好的。"
          },
          {
            "type": "paragraph",
            "text": "卻很像前面二十五年的答案。"
          },
          {
            "type": "paragraph",
            "text": "早餐每天做，\n每天也會被吃完。"
          },
          {
            "type": "paragraph",
            "text": "可是同一群人\n一來再來，\n原本陌生的名字記住了，\n以前的小孩長大了，\n站在櫃檯前的客人，\n也慢慢成了朋友。"
          },
          {
            "type": "paragraph",
            "text": "她每天從安樂區\n騎十五分鐘到過港，\n把店門打開，\n把早餐做好，\n再和一群認識很多年的人\n說幾句話。"
          },
          {
            "type": "paragraph",
            "text": "二十五年前，\n她因緣際會來到這裡。"
          },
          {
            "type": "paragraph",
            "text": "二十五年後，\n過港仍然不是她住的地方。"
          },
          {
            "type": "paragraph",
            "text": "卻成了她朋友很多的地方。"
          }
        ]
      }
    ],
    "ending": {
      "largeLines": [
        "「從客人變成朋友。」"
      ],
      "smallLines": [
        "有些關係，",
        "一開始只是每天來買一份早餐。",
        "來久了，",
        "就熟了。"
      ]
    }
  },
  {
    "slug": "community-kitchen-mother",
    "storyNumber": "03",
    "name": "煮飯阿姨",
    "role": "",
    "titleLines": [
      "這條半小時的路，",
      "她走了十年。"
    ],
    "subtitleLines": [],
    "description": "她沒有住在過港。只是十年來，每天都願意走這條半小時的路。",
    "introBlocks": [
      {
        "type": "quote",
        "text": "「沒有搬來啦，\n是來這裡上班而已。」"
      },
      {
        "type": "paragraph",
        "text": "問起當初怎麼來到過港，\n她馬上糾正。"
      },
      {
        "type": "paragraph",
        "text": "她住在大武崙，\n並不住在過港。"
      },
      {
        "type": "paragraph",
        "text": "每天從家裡過來，\n差不多要半個小時。"
      },
      {
        "type": "quote",
        "text": "「對啊，每天來這裡。」"
      },
      {
        "type": "paragraph",
        "text": "剛來的時候，\n她在廚房幫忙切菜，\n後來又送了一、兩年的便當。"
      },
      {
        "type": "paragraph",
        "text": "再後來，\n煮飯、做產品、整理協會，\n能做的事情慢慢多了。"
      },
      {
        "type": "paragraph",
        "text": "算一算，\n這條半小時的路，\n她已經走了十年。"
      },
      {
        "type": "paragraph",
        "text": "過港不是她住的地方。"
      },
      {
        "type": "paragraph",
        "text": "可是每天時間到了，\n她還是會來。"
      }
    ],
    "sections": [
      {
        "heading": "先從切菜開始",
        "blocks": [
          {
            "type": "paragraph",
            "text": "當初會來過港，\n沒有什麼特別的計畫。"
          },
          {
            "type": "paragraph",
            "text": "那時候孫子開始上幼稚園，\n不用再一直帶在身邊。"
          },
          {
            "type": "paragraph",
            "text": "剛好認識的人問她："
          },
          {
            "type": "paragraph",
            "text": "既然現在有時間，\n要不要來這裡工作？"
          },
          {
            "type": "paragraph",
            "text": "她就這樣來了。"
          },
          {
            "type": "paragraph",
            "text": "最開始，\n是在廚房幫忙切菜。"
          },
          {
            "type": "paragraph",
            "text": "做了一陣子，\n又開始送便當，\n一送就是一、兩年。"
          },
          {
            "type": "paragraph",
            "text": "後來煮飯、\n做產品、\n收東西，\n有空也幫忙整理協會。"
          },
          {
            "type": "paragraph",
            "text": "她說："
          },
          {
            "type": "quote",
            "text": "「該做什麼，\n我們就要做。」"
          },
          {
            "type": "paragraph",
            "text": "沒有把工作分得很細。"
          },
          {
            "type": "paragraph",
            "text": "每天來到這裡，\n看看今天有什麼事情，\n接著做下去，\n一天也就忙了起來。"
          }
        ]
      },
      {
        "heading": "以前要為家庭拚",
        "blocks": [
          {
            "type": "paragraph",
            "text": "來過港以前，\n她的日子也很少真正閒下來。"
          },
          {
            "type": "paragraph",
            "text": "在內湖，\n她自己做過十多年的生意。"
          },
          {
            "type": "paragraph",
            "text": "家裡有孩子要顧，\n公公、婆婆需要照顧的時候，\n生活裡又多了另一份事情。"
          },
          {
            "type": "paragraph",
            "text": "後來離開內湖，\n搬到大武崙。"
          },
          {
            "type": "paragraph",
            "text": "說起以前，\n她用了一個很簡單的字："
          },
          {
            "type": "quote",
            "text": "「拚。」"
          },
          {
            "type": "quote",
            "text": "「以前的生活\n是比較要為了家庭拚。」"
          },
          {
            "type": "paragraph",
            "text": "孩子還小，\n很多事情都得顧。"
          },
          {
            "type": "paragraph",
            "text": "該工作的時候工作，\n該照顧人的時候照顧人。"
          },
          {
            "type": "paragraph",
            "text": "現在孩子都長大了。"
          },
          {
            "type": "paragraph",
            "text": "她還是一樣每天有事情做，\n只是忙的地方，\n慢慢從自己的生活裡，\n多了一個過港。"
          }
        ]
      },
      {
        "heading": "這些以前都不會",
        "blocks": [
          {
            "type": "paragraph",
            "text": "問起來到過港以後的收穫，\n她先從吃的開始數："
          },
          {
            "type": "quote",
            "text": "「我會做蘿蔔糕，\n會滷鐵蛋，\n還有做碗粿，\n還有做白木耳露。」"
          },
          {
            "type": "paragraph",
            "text": "說完，\n她補了一句："
          },
          {
            "type": "quote",
            "text": "「做這個以前都不會。」"
          },
          {
            "type": "paragraph",
            "text": "剛來的時候，\n還只是在廚房幫忙切菜、送便當。"
          },
          {
            "type": "paragraph",
            "text": "十年後，\n這些原本陌生的東西，\n有些已經成了她平常會做的工作。"
          },
          {
            "type": "paragraph",
            "text": "她說得像在報菜名。"
          },
          {
            "type": "paragraph",
            "text": "可是蘿蔔糕、鐵蛋、\n碗粿、白木耳露，\n也剛好把這十年裡\n多學會的事情，\n一樣一樣數了出來。"
          }
        ]
      },
      {
        "heading": "六十歲去讀書",
        "blocks": [
          {
            "type": "paragraph",
            "text": "從「不會」開始的事情，\n不只發生在廚房。"
          },
          {
            "type": "paragraph",
            "text": "六十歲左右，\n女兒一直叫她去讀書。"
          },
          {
            "type": "paragraph",
            "text": "以前沒有什麼讀書的機會，\n很多字不認得，\n連自己的名字，\n也不太會寫。"
          },
          {
            "type": "paragraph",
            "text": "她第一個反應是："
          },
          {
            "type": "quote",
            "text": "「我都不會，\n要怎麼讀書？\n也讀不來啦。」"
          },
          {
            "type": "paragraph",
            "text": "女兒卻一直跟她說："
          },
          {
            "type": "quote",
            "text": "「活到老，學到老啦。」"
          },
          {
            "type": "paragraph",
            "text": "她嘴上答應："
          },
          {
            "type": "quote",
            "text": "「好啦、好啦。」"
          },
          {
            "type": "paragraph",
            "text": "但一年過一年，\n始終沒有真的去。"
          },
          {
            "type": "paragraph",
            "text": "最後，\n女婿乾脆打電話到學校，\n替她把名報好了。"
          },
          {
            "type": "paragraph",
            "text": "再回來告訴她："
          },
          {
            "type": "quote",
            "text": "「我已經報名了，\n報好了喔。」"
          },
          {
            "type": "paragraph",
            "text": "這下真的得去了。"
          },
          {
            "type": "paragraph",
            "text": "隔天要去報到，\n她還是怕。"
          },
          {
            "type": "quote",
            "text": "「我也不敢去，\n因為我害羞。」"
          },
          {
            "type": "paragraph",
            "text": "走進教室，\n同學不熟，\n老師講的內容也常常聽不懂。"
          },
          {
            "type": "paragraph",
            "text": "老師問："
          },
          {
            "type": "quote",
            "text": "「你聽懂了嗎？」"
          },
          {
            "type": "paragraph",
            "text": "她回答："
          },
          {
            "type": "quote",
            "text": "「有啦、有啦。」"
          },
          {
            "type": "paragraph",
            "text": "其實根本不知道\n老師剛才說了什麼。"
          }
        ],
        "image": {
          "src": "/images/people/community-kitchen-mother/li-shui-jin-learning.jpg",
          "alt": "煮飯阿姨",
          "caption": ""
        }
      },
      {
        "heading": "這個字是什麼",
        "blocks": [
          {
            "type": "paragraph",
            "text": "剛開始上課，\n有不懂的地方，\n她也不太敢開口。"
          },
          {
            "type": "paragraph",
            "text": "字不會寫，\n老師講的聽不懂，\n還是先坐著。"
          },
          {
            "type": "paragraph",
            "text": "她說，\n那時候就是沒有膽去問。"
          },
          {
            "type": "paragraph",
            "text": "可是課一堂一堂上，\n老師熟了，\n同學也熟了。"
          },
          {
            "type": "paragraph",
            "text": "到了後來，\n她開始敢問："
          },
          {
            "type": "quote",
            "text": "「老師，\n這個字是什麼？」"
          },
          {
            "type": "paragraph",
            "text": "前後讀了大約三年。"
          },
          {
            "type": "paragraph",
            "text": "她沒有因此\n突然什麼字都認得了。"
          },
          {
            "type": "paragraph",
            "text": "比較複雜的字，\n現在還是會看不懂。"
          },
          {
            "type": "paragraph",
            "text": "到店裡買東西，\n如果不知道怎麼看，\n就直接告訴店員自己要買什麼。"
          },
          {
            "type": "paragraph",
            "text": "別人叫她寫下來，\n她也很直接："
          },
          {
            "type": "quote",
            "text": "「我就不會寫啊。」"
          },
          {
            "type": "paragraph",
            "text": "但一些簡單的字，\n現在已經認得了。"
          },
          {
            "type": "paragraph",
            "text": "第一次真的看懂一個字時，\n她說："
          },
          {
            "type": "quote",
            "text": "「很開心，\n很開心。」"
          },
          {
            "type": "paragraph",
            "text": "以前看過去，\n只知道自己不懂。"
          },
          {
            "type": "paragraph",
            "text": "後來慢慢知道，\n這個字是什麼，\n又是怎麼寫。"
          },
          {
            "type": "paragraph",
            "text": "對她來說，\n多認得一個字，\n就已經是一件\n值得開心的事情。"
          }
        ]
      },
      {
        "heading": "忙忙地過一天",
        "blocks": [
          {
            "type": "paragraph",
            "text": "以前的日子很忙。"
          },
          {
            "type": "paragraph",
            "text": "現在來到過港，\n她其實還是忙。"
          },
          {
            "type": "paragraph",
            "text": "一下煮飯，\n一下做產品，\n一下又要整理東西。"
          },
          {
            "type": "paragraph",
            "text": "沒有產品要做的時候，\n碰上協會的活動，\n也會跟著一起參加。"
          },
          {
            "type": "paragraph",
            "text": "事情一件接著一件，\n一天很快就過去了。"
          },
          {
            "type": "paragraph",
            "text": "但她反而喜歡現在這種忙。"
          },
          {
            "type": "paragraph",
            "text": "待在家裡，\n有時候會一直看手機、追劇，\n人閒下來，\n腦袋也容易想東想西。"
          },
          {
            "type": "paragraph",
            "text": "到了過港，\n手邊總有事情。"
          },
          {
            "type": "paragraph",
            "text": "她說："
          },
          {
            "type": "quote",
            "text": "「來這裡不會一直看手機，\n忙忙地過一天，\n比較充實，\n很快樂這樣。」"
          },
          {
            "type": "paragraph",
            "text": "以前為了家庭拚，\n現在也還是在做事。"
          },
          {
            "type": "paragraph",
            "text": "只是對她來說，\n現在這樣過一天，\n心情已經不太一樣。"
          }
        ]
      },
      {
        "heading": "看到人就會笑",
        "blocks": [
          {
            "type": "paragraph",
            "text": "說起過港的人，\n她一下子講了好幾次："
          },
          {
            "type": "quote",
            "text": "「在這裡人家對我很好，\n太好了，太好了，太好。」"
          },
          {
            "type": "paragraph",
            "text": "好像一句「太好」，\n還不夠。"
          },
          {
            "type": "paragraph",
            "text": "接著，\n她又說："
          },
          {
            "type": "quote",
            "text": "「我在這裡做，\n看到人都會笑，\n我也不知道我在笑。」"
          },
          {
            "type": "paragraph",
            "text": "十年的時間裡，\n每天一起做事情，\n一起煮飯，\n一起說話，\n原本只是工作時會碰到的人，\n漸漸也熟了。"
          },
          {
            "type": "paragraph",
            "text": "有時候，\n一個地方是不是真的熟悉，\n好像不用想得太複雜。"
          },
          {
            "type": "paragraph",
            "text": "看到那些人，\n自己已經會先笑了。"
          }
        ],
        "image": {
          "src": "/images/people/community-kitchen-mother/li-shui-jin-community.jpg",
          "alt": "煮飯阿姨",
          "caption": ""
        }
      },
      {
        "heading": "明天還要上班",
        "blocks": [
          {
            "type": "paragraph",
            "text": "如果有一天沒去，\n她還是會想到第二天。"
          },
          {
            "type": "paragraph",
            "text": "明天幾點要起床，\n衣服要穿什麼，\n是不是該早一點準備。"
          },
          {
            "type": "paragraph",
            "text": "因為明天還要上班。"
          },
          {
            "type": "paragraph",
            "text": "放假她也喜歡。"
          },
          {
            "type": "paragraph",
            "text": "來過港，\n她也喜歡。"
          },
          {
            "type": "paragraph",
            "text": "問起這裡對自己來說\n是一個什麼樣的地方，\n她說："
          },
          {
            "type": "quote",
            "text": "「很快樂，很開心。」"
          },
          {
            "type": "paragraph",
            "text": "還說："
          },
          {
            "type": "quote",
            "text": "「我想在這裡工作很久。」"
          },
          {
            "type": "paragraph",
            "text": "每天半個小時，\n從大武崙到過港。"
          },
          {
            "type": "paragraph",
            "text": "十年過去，\n這條路早就熟了。"
          },
          {
            "type": "paragraph",
            "text": "晚上工作結束，\n她還是會回到自己的家。"
          },
          {
            "type": "paragraph",
            "text": "可是第二天早上，\n時間到了，\n她還是會準備出門。"
          },
          {
            "type": "paragraph",
            "text": "因為過港已經有\n她每天會做的事情，\n有以前不會、\n後來慢慢學會的東西，\n也有一群\n只要看見，\n自己就會笑的人。"
          }
        ]
      }
    ],
    "ending": {
      "largeLines": [
        "「來這裡不會一直看手機，",
        "忙忙地過一天，",
        "比較充實，很快樂這樣。」"
      ],
      "smallLines": [
        "她沒有住在過港。",
        "只是十年來，",
        "每天都願意走這條半小時的路。"
      ]
    },
    "heroImage": {
      "src": "/images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg",
      "alt": "煮飯阿姨",
      "caption": ""
    }
  },
  {
    "slug": "community-volunteer",
    "storyNumber": "04",
    "name": "親家阿公阿嬤",
    "role": "",
    "titleLines": [
      "從騎腳踏車，",
      "到一起慢慢走。"
    ],
    "subtitleLines": [],
    "description": "年輕時，他們各自騎著車送養樂多，那時候還不認識彼此。很多年後，阿公牽著阿嬤，一起來過港上課。路走得慢了一點，兩個人還是一起走。",
    "introBlocks": [
      {
        "type": "paragraph",
        "text": "過港有活動的日子，\n常能看見阿公和阿嬤\n一起慢慢走進來。"
      },
      {
        "type": "paragraph",
        "text": "阿嬤現在走得比較慢，\n阿公就在旁邊牽著她，\n配合著她的腳步往前。"
      },
      {
        "type": "paragraph",
        "text": "他們其實不是過港人。"
      },
      {
        "type": "paragraph",
        "text": "來這裡，\n還得走上一段路、搭上一段車。"
      },
      {
        "type": "paragraph",
        "text": "但有課、有活動的時候，\n兩個人還是常常一起出現。"
      },
      {
        "type": "paragraph",
        "text": "年輕的時候，\n阿公阿嬤都在養樂多公司工作。"
      },
      {
        "type": "paragraph",
        "text": "每天很早出門，\n騎著腳踏車\n到各自負責的地方送貨。"
      },
      {
        "type": "paragraph",
        "text": "那時候，\n兩個人其實還不認識彼此。"
      },
      {
        "type": "paragraph",
        "text": "後來因為工作有了交集，\n才慢慢熟了起來。"
      }
    ],
    "sections": [
      {
        "heading": "那時候還不認識",
        "blocks": [
          {
            "type": "paragraph",
            "text": "年輕的時候，\n阿公阿嬤都在\n養樂多公司工作。"
          },
          {
            "type": "paragraph",
            "text": "每天很早出門，\n騎著腳踏車\n到各自負責的地方送貨，\n也要沿路拜訪新的客人。"
          },
          {
            "type": "paragraph",
            "text": "阿公被分到的區域比較遠。"
          },
          {
            "type": "paragraph",
            "text": "阿嬤回想起來，\n只記得："
          },
          {
            "type": "quote",
            "text": "「他騎腳踏車騎很久，很久。」"
          },
          {
            "type": "paragraph",
            "text": "自己的工作範圍\n則比較近一些。"
          },
          {
            "type": "paragraph",
            "text": "不過那個時候，\n兩個人其實還不認識。"
          },
          {
            "type": "paragraph",
            "text": "阿嬤說："
          },
          {
            "type": "quote",
            "text": "「那時候也不知道他，\n也不認識他。」"
          },
          {
            "type": "paragraph",
            "text": "雖然做著相似的工作，\n每天也都騎著腳踏車送貨，\n彼此的生活\n還沒有真正碰在一起。"
          }
        ]
      },
      {
        "heading": "慢慢熟起來",
        "blocks": [
          {
            "type": "paragraph",
            "text": "後來因為工作，\n兩個人才慢慢有了交集。"
          },
          {
            "type": "paragraph",
            "text": "說起年輕時的彼此，\n阿嬤記得，\n阿公對她很好，\n也很會說話、\n會講笑話。"
          },
          {
            "type": "paragraph",
            "text": "問阿公\n那時候為什麼喜歡阿嬤，\n他的回答很簡單："
          },
          {
            "type": "quote",
            "text": "「漂亮。」"
          },
          {
            "type": "paragraph",
            "text": "兩個人說起以前，\n總是一句一句慢慢接著。"
          },
          {
            "type": "paragraph",
            "text": "一個人說到哪裡，\n另一個人再補一點。"
          },
          {
            "type": "paragraph",
            "text": "有些事情記得很清楚，\n有些已經要想一想\n才說得出來。"
          },
          {
            "type": "paragraph",
            "text": "從原本彼此不認識，\n到後來熟起來，\n再一起走進\n婚後的生活。"
          }
        ]
      },
      {
        "heading": "一天過一天",
        "blocks": [
          {
            "type": "paragraph",
            "text": "結婚以後，\n生活很快被\n家庭和工作填滿。"
          },
          {
            "type": "paragraph",
            "text": "六個孩子要照顧，\n一家人的日子要過，\n後來也有一起做生意的年月。"
          },
          {
            "type": "paragraph",
            "text": "回頭說起這麼長的一段時間，\n他們沒有講得很複雜。"
          },
          {
            "type": "paragraph",
            "text": "只說："
          },
          {
            "type": "quote",
            "text": "「我們的生活就是結婚，\n就是要奮鬥生活，\n一天過一天，\n一天過一天。」"
          },
          {
            "type": "paragraph",
            "text": "工作換過，\n孩子也慢慢長大。"
          },
          {
            "type": "paragraph",
            "text": "很多年的生活，\n就這樣一天接著一天\n走了過來。"
          }
        ]
      },
      {
        "heading": "從家人走進過港",
        "blocks": [
          {
            "type": "paragraph",
            "text": "到了現在，\n他們和過港有了\n另外一段關係。"
          },
          {
            "type": "paragraph",
            "text": "阿公阿嬤並不住在這裡。"
          },
          {
            "type": "paragraph",
            "text": "最早會來，\n是因為大女兒在這裡服務，\n親家也在這裡。"
          },
          {
            "type": "paragraph",
            "text": "所以一開始，\n是順著家人的關係，\n走進了過港。"
          },
          {
            "type": "paragraph",
            "text": "但來著來著，\n要做的事情\n也不只剩下找家人。"
          },
          {
            "type": "paragraph",
            "text": "這裡開始有\n他們自己會參加的課，\n也有一次次\n熟悉起來的活動。"
          },
          {
            "type": "paragraph",
            "text": "原本不是自己居住的社區，\n後來也成了一個\n會特地一起來的地方。"
          }
        ]
      },
      {
        "heading": "一起來上課",
        "blocks": [
          {
            "type": "paragraph",
            "text": "書法，\n是阿嬤特別記得的課。"
          },
          {
            "type": "paragraph",
            "text": "但他們來過港參加的，\n不只有寫字。"
          },
          {
            "type": "paragraph",
            "text": "有時候跟著老師運動，\n有時候做健康操，\n也會參加不同的\n健康課程和社區活動。"
          },
          {
            "type": "paragraph",
            "text": "問起喜不喜歡\n來過港上課，\n他們回答："
          },
          {
            "type": "quote",
            "text": "「對啊，對啊。」"
          },
          {
            "type": "paragraph",
            "text": "最初是因為家人的關係\n來到這裡，\n後來慢慢有了\n自己會參加的課程，\n也認識了更多\n常常碰面的人。"
          },
          {
            "type": "paragraph",
            "text": "所以現在，\n過港對他們來說，\n不只是女兒和親家\n所在的地方，\n也是兩個人\n會一起來上課、\n一起參加活動的地方。"
          }
        ]
      },
      {
        "heading": "一百六十九歲",
        "blocks": [
          {
            "type": "paragraph",
            "text": "訪談那天，\n阿公八十五歲，\n阿嬤八十四歲。"
          },
          {
            "type": "paragraph",
            "text": "說起年紀，\n阿公把兩個人的歲數\n放在一起說："
          },
          {
            "type": "quote",
            "text": "「我們一百六十九歲。」"
          },
          {
            "type": "paragraph",
            "text": "說完也沒有\n特別多解釋什麼。"
          },
          {
            "type": "paragraph",
            "text": "就只是兩個人\n坐在一起，\n慢慢聊以前，\n也聊現在。"
          },
          {
            "type": "paragraph",
            "text": "他們說話不急，\n很多事情\n要想一下才慢慢接著說。"
          },
          {
            "type": "paragraph",
            "text": "那些已經過去很久的日子，\n就這樣一句一句，\n重新被想起來。"
          }
        ]
      },
      {
        "heading": "慢慢走",
        "blocks": [
          {
            "type": "paragraph",
            "text": "阿嬤現在走得慢一些，\n阿公就在旁邊\n牽著她走。"
          },
          {
            "type": "paragraph",
            "text": "有課的時候，\n兩個人再一起來過港。"
          },
          {
            "type": "paragraph",
            "text": "他們並不是這裡的居民。"
          },
          {
            "type": "paragraph",
            "text": "只是因為家人，\n先有了一條\n來到過港的路；\n後來因為上課、\n活動和一次次見面，\n這條路也慢慢\n成了自己的。"
          },
          {
            "type": "paragraph",
            "text": "現在，\n路走得慢了一點，\n阿公就在身邊\n陪著阿嬤一起走。"
          },
          {
            "type": "paragraph",
            "text": "而兩個人常常一起去的地方裡，\n也多了一個過港。"
          }
        ]
      }
    ],
    "ending": {
      "largeLines": [
        "從騎腳踏車，",
        "到一起慢慢走。"
      ],
      "smallLines": [
        "年輕時，",
        "他們各自騎著車送養樂多，",
        "那時候還不認識彼此。",
        "很多年後，",
        "阿公牽著阿嬤，",
        "一起來過港上課。",
        "路走得慢了一點，",
        "兩個人還是一起走。"
      ]
    }
  },
  {
    "slug": "couple-story-one",
    "storyNumber": "05",
    "name": "清爽 × 阿笑",
    "role": "",
    "titleLines": [
      "四十多年，",
      "他們一起把日子",
      "過到了過港。"
    ],
    "subtitleLines": [],
    "description": "四十多年，他們還是一人一句。從一起過日子，到一起走進過港的社區，「爽爽、笑笑」，也就這樣一路叫到了現在。",
    "introBlocks": [
      {
        "type": "quote",
        "text": "「我以前是喜歡他寫的字。」"
      },
      {
        "type": "paragraph",
        "text": "阿笑說起年輕時的清爽，\n第一個想到的，\n是他的字。"
      },
      {
        "type": "paragraph",
        "text": "那時候寫得很工整。"
      },
      {
        "type": "paragraph",
        "text": "話才剛說完，\n她又補了一句："
      },
      {
        "type": "quote",
        "text": "「現在很醜，\n變了，變醜了。」"
      },
      {
        "type": "paragraph",
        "text": "四十多年前，\n兩個人在工作時認識。"
      },
      {
        "type": "paragraph",
        "text": "現在再說起以前，\n還是常常一個人講，\n另一個人在旁邊接話。"
      },
      {
        "type": "paragraph",
        "text": "有時候補充，\n有時候糾正，\n有些事情，\n兩個人甚至記得不太一樣。"
      },
      {
        "type": "paragraph",
        "text": "喜歡他的字是真的。"
      },
      {
        "type": "paragraph",
        "text": "現在嫌他的字醜，\n也是真的。"
      },
      {
        "type": "paragraph",
        "text": "一起生活久了，\n很多話好像已經不用\n特別說得漂亮。"
      }
    ],
    "sections": [
      {
        "heading": "爽爽、笑笑",
        "blocks": [
          {
            "type": "paragraph",
            "text": "「清爽」和「阿笑」，\n是大家熟悉的稱呼。"
          },
          {
            "type": "paragraph",
            "text": "以前的同事發現，\n一個「爽」，\n一個「笑」，\n叫著叫著，\n就成了："
          },
          {
            "type": "quote",
            "text": "「爽爽、笑笑。」"
          },
          {
            "type": "paragraph",
            "text": "阿笑說："
          },
          {
            "type": "quote",
            "text": "「叫我們的名字，\n大家都笑了。」"
          },
          {
            "type": "paragraph",
            "text": "兩個人年輕時在工廠認識。"
          },
          {
            "type": "paragraph",
            "text": "清爽說，\n一開始其實也是："
          },
          {
            "type": "quote",
            "text": "「陰錯陽差。」"
          },
          {
            "type": "paragraph",
            "text": "那段故事說起來有點繞，\n連兩個人自己，\n都有各自記得的版本。"
          },
          {
            "type": "paragraph",
            "text": "比較確定的是，\n他們交往了大約七年，\n民國六十八年結婚。"
          },
          {
            "type": "paragraph",
            "text": "當年被同事湊在一起叫的\n兩個名字，\n後來真的就這樣，\n一起叫了四十多年。"
          }
        ]
      },
      {
        "heading": "各自忙著",
        "blocks": [
          {
            "type": "paragraph",
            "text": "結婚以後，\n真正把日子填滿的，\n很快變成工作和家庭。"
          },
          {
            "type": "paragraph",
            "text": "清爽的工作需要輪班。"
          },
          {
            "type": "paragraph",
            "text": "有時候他去上班，\n家裡的人正在休息；\n等大家白天醒著，\n他的時間又不一定在家。"
          },
          {
            "type": "paragraph",
            "text": "阿笑則忙著孩子和家裡。"
          },
          {
            "type": "paragraph",
            "text": "三個孩子要照顧，\n長輩也需要有人張羅，\n煮飯、洗衣，\n孩子上下課，\n一天裡總有事情\n一件接著一件。"
          },
          {
            "type": "paragraph",
            "text": "阿笑說："
          },
          {
            "type": "quote",
            "text": "「我們是很平凡的生活。」"
          },
          {
            "type": "paragraph",
            "text": "很少旅行，\n生活大多就是\n工作、家庭、孩子，\n一天一天往前過。"
          },
          {
            "type": "paragraph",
            "text": "兩個人明明住在一起，\n卻常常跟著\n不同的時間生活。"
          },
          {
            "type": "paragraph",
            "text": "一個追著班表，\n一個追著一家人的日常。"
          }
        ]
      },
      {
        "heading": "搬來過港",
        "blocks": [
          {
            "type": "paragraph",
            "text": "他們原本住在八堵。"
          },
          {
            "type": "paragraph",
            "text": "後來遇上水災，\n才搬到了過港。"
          },
          {
            "type": "paragraph",
            "text": "一住，\n就是二十多年。"
          },
          {
            "type": "paragraph",
            "text": "阿笑回頭說起搬來之後的生活，\n只說："
          },
          {
            "type": "quote",
            "text": "「都差不多。」"
          },
          {
            "type": "paragraph",
            "text": "那時候，\n孩子還要照顧，\n家裡也還有很多事情。"
          },
          {
            "type": "paragraph",
            "text": "地方換了，\n日子沒有因此\n突然變成另一種樣子。"
          },
          {
            "type": "paragraph",
            "text": "清爽還是跟著\n工作的班表走，\n阿笑也還是忙著\n一家人的生活。"
          },
          {
            "type": "paragraph",
            "text": "過港最開始，\n就是他們每天回來的地方。"
          },
          {
            "type": "paragraph",
            "text": "沒有特別把它說成\n多大的改變，\n卻也這樣住著住著，\n住過了二十多年。"
          }
        ]
      },
      {
        "heading": "退休以後",
        "blocks": [
          {
            "type": "paragraph",
            "text": "後來孩子漸漸大了，\n工作的日子\n也慢慢走到另一個階段。"
          },
          {
            "type": "paragraph",
            "text": "原本總是錯開的時間，\n開始多了一點。"
          },
          {
            "type": "paragraph",
            "text": "阿笑說："
          },
          {
            "type": "quote",
            "text": "「到了我退休以後，\n才知道他的作息，\n才有接觸、才有接觸。」"
          },
          {
            "type": "paragraph",
            "text": "以前清爽什麼時候工作，\n什麼時候休息，\n總得跟著班表走。"
          },
          {
            "type": "paragraph",
            "text": "阿笑則忙著孩子、\n長輩和家裡。"
          },
          {
            "type": "paragraph",
            "text": "等到不用再一直\n追著工作時間跑，\n兩個人才有更多機會\n待在同一個地方。"
          },
          {
            "type": "paragraph",
            "text": "一起吃飯，\n一起待在家裡，\n也開始更清楚\n對方一天到底怎麼過。"
          },
          {
            "type": "paragraph",
            "text": "年輕時，\n兩個人忙著把生活顧好。"
          },
          {
            "type": "paragraph",
            "text": "退休以後，\n才多了一些時間，\n重新熟悉現在的彼此。"
          }
        ]
      },
      {
        "heading": "照顧這個家",
        "blocks": [
          {
            "type": "paragraph",
            "text": "很多年裡，\n阿笑把很大一部分心力\n放在家裡。"
          },
          {
            "type": "paragraph",
            "text": "孩子要顧，\n家裡的長輩，\n她也一直放在心上。"
          },
          {
            "type": "paragraph",
            "text": "她照顧清爽的爸爸時，\n吃的東西太硬，\n就想辦法弄軟；\n高麗菜、香菇不好入口，\n就切得小一點，\n再煮得軟一些。"
          },
          {
            "type": "paragraph",
            "text": "她說："
          },
          {
            "type": "quote",
            "text": "「像我照顧我公公，\n我也是盡心盡力。」"
          },
          {
            "type": "paragraph",
            "text": "對阿笑來說，\n照顧一個人，\n不是有東西吃就好了。"
          },
          {
            "type": "paragraph",
            "text": "還要知道\n他吃不吃得下，\n需要的是什麼。"
          },
          {
            "type": "paragraph",
            "text": "到了現在，\n兩個人的位置\n也慢慢有了改變。"
          },
          {
            "type": "paragraph",
            "text": "阿笑說："
          },
          {
            "type": "quote",
            "text": "「現在退休了以後，\n因為我老了，\n他會幫忙我做家事。」"
          },
          {
            "type": "paragraph",
            "text": "以前她多做一點，\n現在，\n清爽也開始多接一些。"
          },
          {
            "type": "paragraph",
            "text": "四十多年的生活，\n沒有一直照著\n同一種方式過。"
          },
          {
            "type": "paragraph",
            "text": "年紀變了，\n家裡需要做的事情變了，\n兩個人也跟著\n重新分了一次工。"
          }
        ]
      },
      {
        "heading": "一起走進社區",
        "blocks": [
          {
            "type": "paragraph",
            "text": "住在過港二十多年後，\n他們又用另一種方式\n走進這個地方。"
          },
          {
            "type": "paragraph",
            "text": "以前就有人邀請他們\n到社區參與志工。"
          },
          {
            "type": "paragraph",
            "text": "那時候沒有馬上加入，\n後來退休以後，\n兩個人才正式走進協會。"
          },
          {
            "type": "paragraph",
            "text": "訪談當時，\n他們做志工\n其實還不到兩年。"
          },
          {
            "type": "paragraph",
            "text": "和二十多年的居住時間相比，\n這段時間很短。"
          },
          {
            "type": "paragraph",
            "text": "但過港也因此\n多了一點不同。"
          },
          {
            "type": "paragraph",
            "text": "以前，\n這裡是每天生活、\n回家的地方。"
          },
          {
            "type": "paragraph",
            "text": "現在，\n又多了一些\n會一起碰到的人，\n一起參與的事情，\n還有兩個人\n可以一起去的地方。"
          },
          {
            "type": "paragraph",
            "text": "年輕時，\n他們常常各自忙著\n自己的時間。"
          },
          {
            "type": "paragraph",
            "text": "到了退休以後，\n反而一起走進了\n生活二十多年的社區。"
          }
        ],
        "image": {
          "src": "/images/people/couple-story-one/qingshuang-axiao-community.jpg",
          "alt": "清爽 × 阿笑",
          "caption": ""
        }
      },
      {
        "heading": "一半蘋果",
        "blocks": [
          {
            "type": "paragraph",
            "text": "相處的時間多了，\n彼此的習慣，\n也看得更清楚。"
          },
          {
            "type": "paragraph",
            "text": "阿笑習慣照顧人。"
          },
          {
            "type": "paragraph",
            "text": "自己在吃蘋果，\n就會想："
          },
          {
            "type": "paragraph",
            "text": "要不要分清爽一半？"
          },
          {
            "type": "paragraph",
            "text": "到了吃飯時間，\n也會叫他來吃。"
          },
          {
            "type": "paragraph",
            "text": "對她來說，\n有東西，\n自然就會想到旁邊那個人。"
          },
          {
            "type": "paragraph",
            "text": "清爽卻有自己的想法。"
          },
          {
            "type": "paragraph",
            "text": "有時候不想吃，\n就真的不想吃。"
          },
          {
            "type": "paragraph",
            "text": "他說："
          },
          {
            "type": "quote",
            "text": "「過度關心是一種壓力。」"
          },
          {
            "type": "paragraph",
            "text": "阿笑也接著說："
          },
          {
            "type": "quote",
            "text": "「我的關心\n變成他的負擔。」"
          },
          {
            "type": "paragraph",
            "text": "一個覺得："
          },
          {
            "type": "paragraph",
            "text": "有東西當然會想到你。"
          },
          {
            "type": "paragraph",
            "text": "另一個覺得："
          },
          {
            "type": "paragraph",
            "text": "我知道，\n但真的不用一直叫我吃。"
          },
          {
            "type": "paragraph",
            "text": "四十多年了，\n一半蘋果，\n兩個人還是\n各有自己的道理。"
          }
        ]
      },
      {
        "heading": "一人一句",
        "blocks": [
          {
            "type": "paragraph",
            "text": "說起夫妻相處，\n清爽說："
          },
          {
            "type": "quote",
            "text": "「大家互相忍耐、\n互相體諒。」"
          },
          {
            "type": "paragraph",
            "text": "沒有什麼\n特別浪漫的答案。"
          },
          {
            "type": "paragraph",
            "text": "但四十多年裡，\n兩個人的生活\n的確已經換過很多種樣子。"
          },
          {
            "type": "paragraph",
            "text": "年輕時在工作裡認識，\n後來結婚、養孩子，\n從八堵搬到過港，\n又從各自忙著生活，\n走到退休以後\n一起參與社區。"
          },
          {
            "type": "paragraph",
            "text": "阿笑以前喜歡\n清爽工整的字，\n現在會直接在旁邊說："
          },
          {
            "type": "quote",
            "text": "「變醜了。」"
          },
          {
            "type": "paragraph",
            "text": "清爽覺得她\n有時候關心得太多，\n她吃蘋果的時候，\n還是會先想到\n要不要分他一半。"
          },
          {
            "type": "paragraph",
            "text": "兩個人沒有因為\n一起生活很久，\n就變成完全一樣的人。"
          },
          {
            "type": "paragraph",
            "text": "還是一人一句，\n一個有一個的想法。"
          },
          {
            "type": "paragraph",
            "text": "只是四十多年過去，\n他們一起生活的地方，\n慢慢成了過港；\n而住了二十多年以後，\n兩個人又一起\n走進了這個社區的日常裡。"
          }
        ]
      }
    ],
    "ending": {
      "largeLines": [
        "「叫我們的名字，",
        "大家都笑了。」"
      ],
      "smallLines": [
        "四十多年，",
        "他們還是一人一句。",
        "從一起過日子，",
        "到一起走進過港的社區，",
        "「爽爽、笑笑」，",
        "也就這樣一路叫到了現在。"
      ]
    },
    "heroImage": {
      "src": "/images/people/couple-story-one/qingshuang-axiao-portrait.jpg",
      "alt": "清爽 × 阿笑",
      "caption": ""
    }
  },
  {
    "slug": "couple-story-two",
    "storyNumber": "06",
    "name": "丁梅花",
    "role": "過港社區訪視組的組長",
    "titleLines": [
      "去看看，",
      "最近好不好。"
    ],
    "subtitleLines": [],
    "description": "有些事情沒有多大的理由。只是看見了，而自己剛好還做得到。",
    "introBlocks": [
      {
        "type": "quote",
        "text": "「你像今天去你就知道，\n他就會一直講啊講。」"
      },
      {
        "type": "paragraph",
        "text": "那天，我們跟著丁梅花去訪視。"
      },
      {
        "type": "paragraph",
        "text": "坐下來之後，\n長輩開始說最近的生活，\n一件接著一件。"
      },
      {
        "type": "paragraph",
        "text": "梅花沒有急著把話題帶走，\n只是坐在旁邊聽。"
      },
      {
        "type": "paragraph",
        "text": "後來她笑著說："
      },
      {
        "type": "quote",
        "text": "「你跟他講一個小時，\n他還講。」"
      },
      {
        "type": "paragraph",
        "text": "做訪視久了，\n她早就知道，\n有時候走進一戶人家，\n真正需要做的事情並不複雜。"
      },
      {
        "type": "paragraph",
        "text": "不一定要解決什麼。"
      },
      {
        "type": "paragraph",
        "text": "只是隔一段時間，\n再去看看一個人。"
      }
    ],
    "sections": [
      {
        "heading": "最近好不好",
        "blocks": [
          {
            "type": "paragraph",
            "text": "丁梅花是過港社區訪視組的組長。"
          },
          {
            "type": "paragraph",
            "text": "訪視前，\n她會先打電話和長輩聯絡，\n說一聲自己等等會過去。"
          },
          {
            "type": "paragraph",
            "text": "每次去，\n做的事情不一定相同。"
          },
          {
            "type": "paragraph",
            "text": "有時問問最近身體怎麼樣，\n有時看看生活上有沒有需要幫忙的地方；\n碰上想說話的人，\n就坐下來多聊一會兒。"
          },
          {
            "type": "paragraph",
            "text": "梅花笑著說，\n有些長輩一聊起來，\n一個小時都還說不完。"
          },
          {
            "type": "paragraph",
            "text": "訪視久了，\n彼此也慢慢熟了。"
          },
          {
            "type": "paragraph",
            "text": "她記得有一位長輩，\n知道她要過去，\n便先把家裡的門打開等她。"
          },
          {
            "type": "paragraph",
            "text": "聊完準備離開時，\n還會問："
          },
          {
            "type": "quote",
            "text": "「什麼時候要來？」"
          },
          {
            "type": "paragraph",
            "text": "另一位長輩，\n有陣子比較久沒見到梅花，\n再見面時便笑著問她："
          },
          {
            "type": "quote",
            "text": "「萬一你失蹤了呢？」"
          },
          {
            "type": "paragraph",
            "text": "說起這些事情，\n梅花自己也跟著笑。"
          },
          {
            "type": "paragraph",
            "text": "原本只是固定去一趟的訪視，\n做久了以後，\n開始會記得誰最近比較少出門，\n誰身體不太一樣了，\n誰只要一坐下來，\n就有好多話想說。"
          },
          {
            "type": "paragraph",
            "text": "而那些被她一次次探望的人，\n也漸漸記住了她。"
          }
        ]
      },
      {
        "heading": "剪短一點",
        "blocks": [
          {
            "type": "paragraph",
            "text": "固定的日子，\n梅花會在協會裡替長輩剪頭髮。"
          },
          {
            "type": "paragraph",
            "text": "把位置張羅好，\n工具拿出來，\n爺爺奶奶一個接著一個坐下。"
          },
          {
            "type": "paragraph",
            "text": "頭髮剪短一點，\n人看起來清爽，\n自己洗頭、整理也方便一些。"
          },
          {
            "type": "paragraph",
            "text": "而剪頭髮的時間，\n自然也成了說話的時間。"
          },
          {
            "type": "paragraph",
            "text": "有人說家裡的事，\n有人聊最近的生活，\n有時候頭髮剪完了，\n話還沒有說完。"
          },
          {
            "type": "paragraph",
            "text": "美髮原本就是梅花熟悉的事。"
          },
          {
            "type": "paragraph",
            "text": "做了很多年，\n這項手藝也一直留在身上。"
          },
          {
            "type": "paragraph",
            "text": "只是後來，\n她開始注意到另一件事。"
          },
          {
            "type": "paragraph",
            "text": "過港有不少坡道。"
          },
          {
            "type": "paragraph",
            "text": "以前站在外頭，\n她常看見長輩買完菜，\n走到一半累了，\n就在路旁坐下來休息。"
          },
          {
            "type": "paragraph",
            "text": "看久了，\n心裡冒出一個問題："
          },
          {
            "type": "quote",
            "text": "「有一天如果他們走不動，\n要出來剪頭髮要怎麼辦？」"
          },
          {
            "type": "paragraph",
            "text": "所以能自己出門的人，\n就在協會裡剪；\n真的不方便外出的，\n她就把工具帶著，\n自己走過去。"
          },
          {
            "type": "paragraph",
            "text": "不是突然多了一份新的工作。"
          },
          {
            "type": "paragraph",
            "text": "只是自己原本就會做的事情，\n剛好能在別人需要的時候，\n再多派上一點用場。"
          }
        ]
      },
      {
        "heading": "走進門裡，也會看見更多事情",
        "blocks": [
          {
            "type": "paragraph",
            "text": "訪視，\n並不總是坐下來聊天。"
          },
          {
            "type": "paragraph",
            "text": "有一次，\n梅花去看一位行動不方便的長輩。"
          },
          {
            "type": "paragraph",
            "text": "人跌在床邊，\n她想把對方扶起來，\n卻怎麼樣都拉不動。"
          },
          {
            "type": "paragraph",
            "text": "最後只能趕快找人幫忙，\n聯絡里長、請救護人員過來，\n才把長輩送去醫院。"
          },
          {
            "type": "paragraph",
            "text": "回頭說起那一天，\n她還記得自己被嚇到了。"
          },
          {
            "type": "paragraph",
            "text": "也記得一件事："
          },
          {
            "type": "paragraph",
            "text": "還好那一天，\n門有辦法打開。"
          },
          {
            "type": "paragraph",
            "text": "不然裡面發生了什麼，\n外面的人可能根本不知道。"
          },
          {
            "type": "paragraph",
            "text": "做訪視久了，\n梅花也看著一些熟悉的人\n一年一年變老。"
          },
          {
            "type": "paragraph",
            "text": "原本還能自己走，\n後來漸漸需要更多幫忙；\n有些以前常見的人，\n後來也不在了。"
          },
          {
            "type": "paragraph",
            "text": "問起訪視這些年，\n有沒有哪一件事情特別讓她感動，\n梅花沒有挑出一個漂亮的故事。"
          },
          {
            "type": "paragraph",
            "text": "只是說："
          },
          {
            "type": "quote",
            "text": "「我會心會捨不得。」"
          }
        ]
      },
      {
        "heading": "能動、能做，就盡量做",
        "blocks": [
          {
            "type": "paragraph",
            "text": "問梅花，\n為什麼願意一直做這些事情，\n她沒有講什麼大道理。"
          },
          {
            "type": "paragraph",
            "text": "只說："
          },
          {
            "type": "quote",
            "text": "「我從頭到尾沒有動機，\n我就是想要做。」"
          },
          {
            "type": "paragraph",
            "text": "看到桌子搬不動，\n自己有辦法，\n就過去幫；\n時間到了，\n就去訪視；\n有人需要剪頭髮，\n自己剛好會，\n那就剪。"
          },
          {
            "type": "paragraph",
            "text": "除了訪視與義剪，\n社區裡其他需要人手的事情，\n也常常看得到梅花。"
          },
          {
            "type": "paragraph",
            "text": "家人很清楚她的個性。"
          },
          {
            "type": "paragraph",
            "text": "先生曾經對孩子說："
          },
          {
            "type": "quote",
            "text": "「你媽媽就是喜歡這樣，\n她這樣才會快樂。」"
          },
          {
            "type": "paragraph",
            "text": "梅花自己也笑著認了。"
          },
          {
            "type": "paragraph",
            "text": "最後，\n她把理由說得更簡單："
          },
          {
            "type": "quote",
            "text": "「我的想法是，\n我能動、能做，\n我就盡量做。」"
          },
          {
            "type": "paragraph",
            "text": "很多事情沒有多大的理由。"
          },
          {
            "type": "paragraph",
            "text": "只是看見了，\n而自己剛好還做得到。"
          }
        ]
      },
      {
        "heading": "姐姐們像一面鏡子",
        "blocks": [
          {
            "type": "paragraph",
            "text": "訪視，\n不只是梅花走進別人的生活。"
          },
          {
            "type": "paragraph",
            "text": "她也會從那些人身上，\n想到自己。"
          },
          {
            "type": "paragraph",
            "text": "協會裡比她年長的姐姐們，\n她說，\n就像自己的「鏡子」。"
          },
          {
            "type": "quote",
            "text": "「我會學她們的優點，\n缺點看一看就好了。」"
          },
          {
            "type": "paragraph",
            "text": "看著有人依然願意出門，\n有人身體保持得很好，\n也有人慢慢需要更多照顧，\n她會開始想："
          },
          {
            "type": "paragraph",
            "text": "以後，\n自己想怎麼生活？"
          },
          {
            "type": "paragraph",
            "text": "所以還走得動，\n就多走一點；\n能出門，\n就不要一直關在家裡。"
          },
          {
            "type": "paragraph",
            "text": "梅花說，\n如果沒有出來做志工，\n自己搞不好也會晚睡晚起，\n在家裡追劇，\n一天坐著坐著就過去了。"
          },
          {
            "type": "paragraph",
            "text": "現在雖然忙，\n有時候也真的會累，\n可是看到長輩坐在一起說話、笑，\n看到原本沒有太多表情的臉\n跟著有了笑容，\n自己的心情也會好起來。"
          }
        ]
      },
      {
        "heading": "走出來，外面也有快樂",
        "blocks": [
          {
            "type": "paragraph",
            "text": "訪談快結束時，\n梅花說起自己最想告訴大家的一件事："
          },
          {
            "type": "quote",
            "text": "「走出來，不要關在家裡。」"
          },
          {
            "type": "paragraph",
            "text": "接著又補了一句："
          },
          {
            "type": "quote",
            "text": "「外面也有快樂的。」"
          },
          {
            "type": "paragraph",
            "text": "這句話，\n聽起來像是在說給長輩聽。"
          },
          {
            "type": "paragraph",
            "text": "但一路聽下來，\n好像也很像她自己的生活。"
          },
          {
            "type": "paragraph",
            "text": "固定的日子，\n有人走進協會找她；\n訪視的日子，\n換她從協會走出去。"
          },
          {
            "type": "paragraph",
            "text": "有人還能自己出門，\n就在外面見面。"
          },
          {
            "type": "paragraph",
            "text": "有人已經不方便走出來，\n那就走進去看看。"
          },
          {
            "type": "paragraph",
            "text": "一次又一次的往來裡，\n原本只是住在同一個社區的人，\n慢慢知道了彼此的名字，\n也開始知道，\n最近過得好不好。"
          }
        ]
      },
      {
        "heading": "慢慢熟起來的人",
        "blocks": [
          {
            "type": "paragraph",
            "text": "做訪視久了，\n梅花認識的，\n不再只是名單上的名字。"
          },
          {
            "type": "paragraph",
            "text": "她知道誰最近比較少出門，\n誰的腳步變慢了，\n誰只要坐下來，\n就有很多話想說。"
          },
          {
            "type": "paragraph",
            "text": "有些人看到她，\n會問怎麼這麼久沒來；\n有些人知道她要過去，\n就先把門打開等著。"
          },
          {
            "type": "paragraph",
            "text": "這些事情沒有很大的聲音。"
          },
          {
            "type": "paragraph",
            "text": "只是一次次見面，\n一次次說話，\n慢慢把彼此變成熟悉的人。"
          },
          {
            "type": "paragraph",
            "text": "對丁梅花來說，\n過港也因此不只是工作的地方，\n或一個需要她來幫忙的社區。"
          },
          {
            "type": "paragraph",
            "text": "這裡有她會記掛的人，\n也有人會記得她。"
          },
          {
            "type": "paragraph",
            "text": "她在一次次走進別人的生活裡，\n也慢慢把自己留在了過港的日常裡。"
          }
        ]
      }
    ],
    "ending": {
      "largeLines": [
        "「我的想法是，",
        "我能動、能做，",
        "我就盡量做。」"
      ],
      "smallLines": [
        "有些事情沒有多大的理由。",
        "只是看見了，",
        "而自己剛好還做得到。"
      ]
    }
  }
];

export function getPeopleStory(slug: string) {
  return PEOPLE_STORIES.find((story) => story.slug === slug);
}

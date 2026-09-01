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
  sections: PeopleStorySection[];
};

export const PEOPLE_STORIES: PeopleStory[] = [
  {
    slug: "bottle-cap-grandma",
    storyNumber: "01",
    name: "林秀英",
    role: "瓶蓋牆創作者",
    titleLines: ["把時間", "一個瓶蓋一個瓶蓋留在過港。"],
    subtitleLines: ["這雙閒不下來的手，", "也走到了過港的牆上。"],
    description: "林秀英把畫畫、寫字、刻印與手作帶進社區，也和大家用一個個瓶蓋，在過港的牆上留下共同完成的地方風景。",
    sections: [
      {
        heading: "她做過的事情，好像很難一次數完",
        blocks: [
          { type: "paragraph", text: "林秀英總覺得，時間不該空著。" },
          { type: "paragraph", text: "畫畫、寫字、刻印、做手工，一片葉子、一只用完的罐子，到了她手裡，總還能再變成一些什麼。" },
          { type: "paragraph", text: "後來，這雙閒不下來的手，也走到了過港的牆上。" },
          { type: "paragraph", text: "一個瓶蓋、一個瓶蓋，貼成了今天仍留在社區裡的風景。" },
          { type: "paragraph", text: "聊到自己做過哪些東西，秀英奶奶沒有認真坐下來數。" },
          { type: "paragraph", text: "反而開始一張一張翻起照片。" },
          { type: "quote", text: "「這個也是我做的。」 「你看，這是我的。」 「這個是我自己刻的。」" },
          { type: "paragraph", text: "畫、字、印章、花、合唱團，一張接著一張。" },
          { type: "paragraph", text: "我們還來不及把上一張看完，她已經準備說下一件作品的故事。" },
          { type: "paragraph", text: "要問林秀英到底做過多少東西，答案好像沒有那麼重要。" },
          { type: "paragraph", text: "因為對她來說，做完一件事情之後，很快又會有下一件。" },
          { type: "paragraph", text: "看見葉子，便想著怎麼把它拼起來；用完的優酪乳罐，捨不得直接丟掉，剪一剪，又能變成一朵花。" },
          { type: "paragraph", text: "畫得不滿意的紙也不一定作廢，把還能用的地方剪下來，下一次再畫。" },
          { type: "paragraph", text: "很多東西到了秀英奶奶手裡，好像都很少被輕易判定成「沒用了」。" },
          { type: "paragraph", text: "對材料是這樣，對時間也是。" },
        ],
      },
      {
        heading: "一面牆，是很多雙手一起長出來的",
        blocks: [
          { type: "paragraph", text: "現在站在瓶蓋牆前，眼睛先看到的是一整面的顏色。" },
          { type: "paragraph", text: "但最開始，那些顏色只是居民手裡一袋一袋不起眼的瓶蓋。" },
          { type: "paragraph", text: "知道社區要收瓶蓋，有人今天拿一包來，隔天又有人提著另一包出現。" },
          { type: "paragraph", text: "幾乎每天都有人送。" },
          { type: "paragraph", text: "瓶蓋收回來，還得先洗乾淨、曬乾，再把紅的、綠的、藍的、深的、淺的，一桶一桶分開。" },
          { type: "paragraph", text: "真正開始貼牆，又是另外一件事。" },
          { type: "paragraph", text: "牆面太滑，水泥會往下流，就先拿榔頭，一下一下把牆敲粗。" },
          { type: "paragraph", text: "有人幫忙敲牆，有人處理水泥，有空的志工就過來搭一把手。" },
          { type: "paragraph", text: "林秀英站上鷹架，盯著圖，也盯著顏色。" },
          { type: "paragraph", text: "原先有人協助把圖構好，她看了卻總覺得不太對。" },
          { type: "quote", text: "「跟我手畫的感覺完全不一樣。」" },
          { type: "paragraph", text: "於是做到一半，秀英奶奶又偷偷把一些地方改成自己想要的樣子。" },
          { type: "paragraph", text: "就這樣，從早上到下午，一天一天貼。" },
          { type: "paragraph", text: "一貼，就是兩個多月。" },
          { type: "paragraph", text: "所以問起瓶蓋牆，她很少只說「這是我做的」。" },
          { type: "paragraph", text: "因為記得的，還有那些每天拿瓶蓋來的人，以及施工時，站在旁邊一起動手的每一雙手。" },
          { type: "paragraph", text: "一個人的想法，最後放進了很多人的時間，才真正留在牆上。" },
        ],
      },
      {
        heading: "這雙手，一直沒有真正停過",
        blocks: [
          { type: "paragraph", text: "秀英奶奶笑自己的手，是「勞碌命的手」。" },
          { type: "paragraph", text: "在過港生活的這些年，這雙手做過很多事情。" },
          { type: "paragraph", text: "照顧家裡，也工作。" },
          { type: "paragraph", text: "她曾經在社區開了幾十年的美髮店，洗頭、剪髮、燙髮，一雙手每天反覆做著。" },
          { type: "paragraph", text: "時間久了，肩膀會痛，連手指也留下工作的痕跡。" },
          { type: "paragraph", text: "可是後來不再做美髮，這雙手也沒有因此安靜下來。" },
          { type: "paragraph", text: "只是做的事情變多了。" },
          { type: "paragraph", text: "畫畫、寫字、刻印、做花、做手工，社區有事情，也常常看得到林秀英的身影。" },
          { type: "paragraph", text: "說起自己的手，她笑著說：" },
          { type: "quote", text: "「你看，兩隻手都沒有停止下來，就是勞碌命的手。」" },
          { type: "paragraph", text: "語氣像是在笑自己，但下一句，又說得很認真：" },
          { type: "quote", text: "「我們的手這麼大支，什麼也不做，實在很可惜。」" },
          { type: "paragraph", text: "好像只要還能動，這雙手就應該再替日子留下些什麼。" },
        ],
      },
      {
        heading: "時間不能留白",
        blocks: [
          { type: "paragraph", text: "六十歲那年，林秀英開始學國畫。" },
          { type: "paragraph", text: "小時候其實就喜歡畫，只是結婚之後，家裡有孩子、有長輩，日子自然先被許多事情填滿。" },
          { type: "paragraph", text: "等到孫子開始上學，手上多出了一點時間。" },
          { type: "paragraph", text: "於是去學畫。" },
          { type: "paragraph", text: "畫著畫著，又想學書法。" },
          { type: "paragraph", text: "希望自己的畫可以自己落款，也希望上面的章是自己刻的，便再往前走一步，去碰篆字、刻印。" },
          { type: "paragraph", text: "一樣接著一樣。" },
          { type: "paragraph", text: "秀英奶奶沒有把「六十歲」說得多特別。" },
          { type: "paragraph", text: "不是終於迎來另一段人生，也不是突然決定成為誰。" },
          { type: "paragraph", text: "只是有時間了，而剛好還有很多東西想學。" },
          { type: "quote", text: "「活到老，學到老。」" },
          { type: "paragraph", text: "直到現在，睡覺以前，她還會先想一遍：" },
          { type: "paragraph", text: "明天起來要先做什麼？接下來還有什麼事情？" },
          { type: "paragraph", text: "然後說出一句，幾乎可以解釋這些年做過的所有事情：" },
          { type: "quote", text: "「時間不能留白。」" },
          { type: "paragraph", text: "人的時間沒有想像中那麼多。" },
          { type: "paragraph", text: "如果明明還能學、還能做，卻讓它就這樣過去了，林秀英會覺得可惜。" },
        ],
      },
      {
        heading: "原本在家裡做的事，慢慢走到了外面",
        blocks: [
          { type: "paragraph", text: "以前，很多喜歡的事情，只是在家裡自己畫、自己做。" },
          { type: "paragraph", text: "後來有了社區，事情開始不太一樣。" },
          { type: "paragraph", text: "有人提出一個想法，大家坐下來討論，秀英奶奶就把自己會的東西拿出來。" },
          { type: "paragraph", text: "瓶蓋牆是這樣，其他作品也是。" },
          { type: "paragraph", text: "她帶過學生一起做，也教居民畫畫。" },
          { type: "paragraph", text: "社區裡有些角落，一眼看過去或許不知道是誰留下的，但仔細問，總有一些經過林秀英的手。" },
          { type: "paragraph", text: "家人曾經笑她：" },
          { type: "quote", text: "「妳在活動中心的時間，好像比在家裡還多。」" },
          { type: "paragraph", text: "聽起來，她倒也不覺得奇怪。" },
          { type: "paragraph", text: "因為去久了，大家有事情就往這裡跑；有什麼東西覺得社區用得到，也會順手帶過來。" },
          { type: "paragraph", text: "在秀英奶奶口中，大家早就把活動中心當成自己家裡的一部分。" },
          { type: "paragraph", text: "而一個地方，大概也是這樣才慢慢變成「自己的」。" },
          { type: "paragraph", text: "不是因為說了一句「這是我的社區」，而是有一天，看到一件事情時，很自然地開始想：" },
          { type: "paragraph", text: "這裡是不是用得到？" },
          { type: "paragraph", text: "自己是不是也能做一點什麼？" },
        ],
      },
      {
        heading: "住久了，就有感情了",
        blocks: [
          { type: "paragraph", text: "林秀英嫁來過港，已經是六十多年前的事。" },
          { type: "paragraph", text: "那時候的過港，還不是現在的樣子。" },
          { type: "paragraph", text: "她記得以前的房子，記得道路還沒有這麼寬，也記得這個地方一點一點有人住進來，慢慢變得熱鬧。" },
          { type: "paragraph", text: "時間走過過港，也走過秀英奶奶的人生。" },
          { type: "paragraph", text: "在這裡成家，在這裡工作，在這裡照顧家人；後來畫畫、寫字、做作品，也在這裡當志工。" },
          { type: "paragraph", text: "外地有人來參訪，她曾經帶著大家沿著社區走，介紹基隆河，也介紹這些年居民一起做的事情。" },
          { type: "paragraph", text: "說起有人特地來看過港，林秀英只用了很輕的一句話：" },
          { type: "quote", text: "「有一點驕傲，真的。」" },
          { type: "paragraph", text: "到了訪談快結束，問起過港對她到底是什麼，秀英奶奶沒有說什麼很大的話。" },
          { type: "quote", text: "「你在一個地方待久了，你就會有感情在這裡。」" },
          { type: "paragraph", text: "說著，又補了一句。" },
          { type: "quote", text: "「我在這裡住這麼久了，有感情，我也離不開這裡。」" },
        ],
      },
      {
        heading: "有些時間，最後會變成一個地方的樣子",
        blocks: [
          { type: "paragraph", text: "瓶蓋放久了，顏色也許會慢慢褪。" },
          { type: "paragraph", text: "牆面有一天，也會留下風吹雨打的痕跡。" },
          { type: "paragraph", text: "但對林秀英來說，那面牆真正留下來的，好像從來不只有瓶蓋。" },
          { type: "paragraph", text: "還有某一天，有人提著一包洗乾淨的瓶蓋走進社區；有人坐下來分類顏色，有人敲牆、拌水泥，有人站上鷹架，把自己一天裡的一點時間，留在同一面牆上。" },
          { type: "paragraph", text: "而秀英奶奶留在過港的時間，早已比那兩個多月更長。" },
          { type: "paragraph", text: "六十多年，一間店、一個家、一間活動中心，一張畫、一顆印章、一面牆。" },
          { type: "paragraph", text: "很多事情做的時候都很小，小到不一定會特別記得日期。" },
          { type: "paragraph", text: "可是當時間一件一件疊起來，回頭再看，那些生活過的痕跡，已經成了地方的一部分。" },
          { type: "paragraph", text: "林秀英說，時間不能留白。" },
          { type: "paragraph", text: "於是這些年，她把可以用的材料留下來，把可以學的事情學起來，也把自己能做的一點一點，留在了過港。" },
          { type: "paragraph", text: "而過港，也收下了她這六十多年的時間。" },
          { type: "quote", text: "「時間不能留白。」" },
          { type: "paragraph", text: "她把日子一點一點填滿，也讓其中一些，留成了過港今天的樣子。" },
        ],
      },
    ],
  },
  {
    slug: "breakfast-shop-owner",
    storyNumber: "02",
    name: "黃淑惠",
    role: "美食坊老闆娘",
    titleLines: ["煎台上的", "晨之味"],
    subtitleLines: ["——守著一方煎台，", "也守著一條街的成長與人情"],
    description: "黃淑惠守著美食坊的煎台二十五年，在每天清晨的早餐與問候裡，看著過港的孩子長大，也陪著一條街走過歲月。",
    sections: [
      {
        heading: "煎台上的清晨",
        blocks: [
          { type: "paragraph", text: "清晨四點多的過港，天色總是一片寂靜。當多數人還在被窩裡貪戀夢鄉時，「美食坊」的鐵捲門已伴隨著一聲清脆的摩擦聲響滑開。老闆娘俐落地綁好圍裙，煎鏟在熱鐵板上滋滋作響，翻面、打蛋，熟練地製作著一份又一份溫熱的三明治。空氣裡很快漫開奶油與肉排的香氣，爐上那大桶紅茶也正緩緩滾著。這樣的光景，她日復一日地重複了二十五年。" },
          { type: "paragraph", text: "梳著一頭乾淨馬尾，手裡總握著那把熟悉的煎鏟，二十五年來，她始終站在同一方煎台前。對過港的人來說，這道身影早已成為清晨最熟悉的風景。她，就是大家口中的美食坊老闆娘——黃淑惠。" },
        ],
      },
      {
        heading: "落腳過港時",
        blocks: [
          { type: "paragraph", text: "說起當初怎麼會來到過港落腳，老闆娘只是笑笑地說：「有緣分啊。」" },
          { type: "paragraph", text: "回想起開業的初衷，其實沒有什麼驚天動地的創業夢想。年輕時的老闆娘曾在電腦前埋首於密密麻麻的文書輸入，日子安靜，卻也顯得單調。直到後來去舅媽經營的早餐店幫忙，在鍋碗瓢盆與蒸騰的熱氣裡漸漸熟稔了這門手藝。幾年過去，她看中了過港這處屋況小巧、價錢合宜的店面，索性在這裡開了屬於自己的小店。" },
          { type: "paragraph", text: "早餐店一開，就是二十五年。從那時起，她的生活也跟著早餐店的作息轉動，天還沒亮便起床準備，日復一日站上煎台。" },
          { type: "quote", text: "這份天還沒亮就得起床的日子，對她而言早已成了生活的一部分，她淡淡笑著：「賺錢都嘛累，總是要生活啊。」語氣中滿是與生活達成默契的坦然。" },
        ],
      },
      {
        heading: "一間早餐店，一條街的人情",
        blocks: [
          { type: "paragraph", text: "這是一間再樸實不過的早餐店，沒有翻新求變的花樣，賣的就是蔥抓餅、鐵板麵與簡單溫暖的早點。她的原則樸素得可愛：「我們自己敢吃的，才能給客人吃。」" },
          { type: "paragraph", text: "而讓小店一直留在過港人記憶裡的，是街坊之間深厚的人情。這裡的客人多半成了熟面孔，甚至是幾十年的老友。「我們這種小社區，其實客人就是差不多那樣，都是熟客。」" },
          { type: "paragraph", text: "對黃淑惠來說，最有感觸的，莫過於看著社區裡的孩子一個個長大。從當年牽著大人衣角的小不點，到如今出社會、成家生子，她也一路看在眼裡。" },
          { type: "quote", text: "「對別人家的小孩子也是跟自己的小孩子一樣啊。上學要注意、走旁邊一點，你都要交代一聲。」" },
          { type: "paragraph", text: "說起這些孩子，她笑著說，當年那些小小朋友如今都長大了，見面還是一聲聲「阿姨、阿姨」地叫著，而自己也從阿姨一路被叫成了姨媽，甚至阿嬤。" },
          { type: "paragraph", text: "如今支撐她捨不得退休的原因，早已不只是為了營生，或是擔心身體提早退化。對她而言，每天早上來這裡和老鄰居「打屁聊天」，聽著此起彼落的問候，才是日子裡最踏實的甜。" },
        ],
      },
      {
        heading: "晨光裡的餘韻",
        blocks: [
          { type: "paragraph", text: "這份樸實的情感，正如店裡最受歡迎的椰香吐司——簡簡單單、香香甜甜，沒有複雜的滋味與過度張揚的裝飾，卻在烤得微酥後散發出淡淡椰香，入口溫潤，留下綿長的餘韻。" },
          { type: "paragraph", text: "二十五年來，美食坊就這樣靜靜佇立在過港的晨光裡，用爐火與真情，烹煮出這座小社區最溫暖的人情記憶。" },
        ],
      },
    ],
  },
  {
    slug: "community-kitchen-mother",
    storyNumber: "03",
    name: "李水錦阿姨",
    role: "過港社區灶腳夥伴",
    titleLines: ["十年灶腳，", "一味歡喜"],
    subtitleLines: ["——在炊煙與笑聲裡，", "重新找到生活的滋味"],
    description: "李水錦阿姨十年來往返過港，在社區灶腳備餐、送便當、學做新食物，也在六十歲時重新走進教室。",
    heroImage: {
      src: "/images/people/community-kitchen-mother/li-shui-jin-kitchen.jpg",
      alt: "李水錦阿姨在過港社區灶腳烹煮食物",
      caption: "水錦阿姨在灶腳裡準備餐食。",
    },
    sections: [
      {
        heading: "灶腳裡的笑聲，煮著她的人生",
        blocks: [
          { type: "paragraph", text: "早晨九點，鍋鏟聲在灶腳裡來回響著，伴著升起的炊煙，也喚醒了一天的忙碌。" },
          { type: "paragraph", text: "從大武崙騎車而來的李水錦阿姨，早已熟門熟路地走進廚房。約莫半小時的車程，從十年前開始，她便這樣一路騎來。晴天如此，雨天也是如此。" },
          { type: "paragraph", text: "在過港協會的灶腳裡，她和一群媽媽們穿梭在炊煙與鍋鏟之間，洗菜、切菜、備料，再將一餐餐熱騰騰的飯菜送到長輩手中。對水錦阿姨來說，這些工作早已熟悉得不能再熟悉。" },
          { type: "quote", text: "「剛來的時候都在廚房幫忙切菜，做一做就去送便當。」阿姨總是笑笑著說。" },
          { type: "paragraph", text: "十年的時間，在過港社區的灶腳裡慢慢流轉，從洗菜、切菜開始，到後來學著做各種商品美食。廚房裡的一鍋一湯、一餐一飯，也漸漸的成了她生活的一部分。" },
        ],
      },
      {
        heading: "從內湖的風雨，到過港的安頓",
        blocks: [
          { type: "paragraph", text: "在來到過港之前，水錦阿姨一邊擺著檳榔攤，一邊照顧相繼臥病八年與四年的公婆，還要扶養孩子。生活裡總有做不完的事情，也總有放不下的責任。" },
          { type: "quote", text: "「孩子如果小，就要比較拚、比較勤。不像現在，想買什麼就來買，因為現在小孩都長大了。」說起那些日子，阿姨也只是淡淡地笑著。" },
          { type: "paragraph", text: "那些曾經壓在肩上的重量，如今都已經成了回憶。" },
          { type: "paragraph", text: "十年前，因為一段因緣，她來到過港社區。起初，理事長介紹她來這裡工作，沒想到一待就是十年。原本只是生活裡的一份工作，後來卻慢慢成了她每天最期待去的地方。" },
        ],
      },
      {
        heading: "灶腳裡的熱心，也藏著人情味",
        blocks: [
          { type: "paragraph", text: "走進過港社區的廚房，總能看見阿姨忙碌的身影。" },
          { type: "paragraph", text: "備料、切菜、烹煮、送便當，一件件看似平凡的事情，她總是做得認真。鍋裡冒著熱氣，她就在一旁忙進忙出，把一餐餐熱騰騰的飯菜端上桌。" },
          { type: "paragraph", text: "而這十年，她在這裡學到很多。" },
          { type: "quote", text: "「來到這邊，我會做蘿蔔糕，會滷鐵蛋，還有做碗粿，還有做銀耳露，以前都不會做這個。」" },
          { type: "paragraph", text: "從原本不會，到慢慢學會，阿姨的手藝是在一天天的日子裡累積起來的。但比起多會做幾道菜，她更珍惜的，或許是這裡的人情。" },
          { type: "quote", text: "「在這裡人家對我很好，太好了。大家都喜歡我，他們都喜歡我在這裡工作。」" },
          { type: "paragraph", text: "說這些話時，她笑得特別開心。那份被需要、被喜歡的感覺，或許也是她願意十年如一日騎著車來到過港的原因。" },
          { type: "paragraph", text: "對她來說，這裡早已不只是一個工作的地方。灶腳裡升起的不只是飯菜的香氣，也有熟悉的人聲、笑聲，以及一群了解自己的老朋友。" },
        ],
        image: {
          src: "/images/people/community-kitchen-mother/li-shui-jin-community.jpg",
          alt: "李水錦阿姨在社區灶腳和夥伴互動",
          caption: "灶腳裡的合作與笑聲，成了她珍惜的日常。",
        },
      },
      {
        heading: "六十歲，再當一次學生",
        blocks: [
          { type: "paragraph", text: "阿姨的人生裡，也曾有過一次截然不同的經歷。" },
          { type: "paragraph", text: "六十歲那年，在理事長和女兒的鼓勵下，她決定重返校園，走進夜校的大門。" },
          { type: "paragraph", text: "那時候的她，連自己的名字都寫得歪歪扭扭，許多字也看不懂。對一個已經六十歲的人來說，重新坐進教室，本身就是一件需要勇氣的事。" },
          { type: "paragraph", text: "剛開始，老師問她：「聽懂了嗎？」" },
          { type: "paragraph", text: "她總是有些不好意思地回答：「有啦。」" },
          { type: "paragraph", text: "後來勇氣多了一些，遇到不懂的地方，也敢舉手發問老師：「這個音要怎麼讀？」" },
          { type: "quote", text: "「但是我現在還是看不太懂字」" },
          { type: "paragraph", text: "說完，水錦阿姨也忍不住害羞地笑了起來。" },
          { type: "paragraph", text: "雖然最後，她並沒有真的學會認字，但那段重新坐在課桌前的日子，對她而言，仍是一段很特別的回憶。" },
        ],
        image: {
          src: "/images/people/community-kitchen-mother/li-shui-jin-learning.jpg",
          alt: "李水錦阿姨坐在桌前閱讀資料",
          caption: "六十歲重回教室，成為她人生裡一段特別的回憶。",
        },
      },
      {
        heading: "「人生就是要健康、要快樂」",
        blocks: [
          { type: "paragraph", text: "從年輕時早早成家、一路撫養八個孩子，到內湖擺攤討生活，再到照顧長輩多年，阿姨的人生走過許多忙碌的日子。" },
          { type: "paragraph", text: "如今，孩子都已經長大，她也來到了過港。" },
          { type: "paragraph", text: "問起現在最想要的是什麼，她說：" },
          { type: "quote", text: "「人生就要健康、要快樂，還要天天開心。」" },
          { type: "paragraph", text: "一句簡單的話，卻像是她走過大半人生後，留下最樸實的答案。" },
          { type: "paragraph", text: "每天騎著車來到過港，在灶腳裡忙上一整天，有人來、有飯煮、有事情做，也有一群熟悉的人陪著說說笑笑。比起獨處，她更喜歡將日子填得充實。" },
          { type: "quote", text: "「十年灶腳，一味歡喜。」" },
          { type: "paragraph", text: "十年的時間，讓她把自己的生活，一點一點留在這座灶腳裡，也讓過港記住了水錦阿姨的笑聲。" },
          { type: "paragraph", text: "炊煙升起時，她總還在鍋邊忙著；飯菜起鍋時，她也總帶著熟悉的笑容。" },
          { type: "paragraph", text: "而那些看似平凡的每一天，早已成了她人生裡最溫熱的一段光景。" },
          { type: "paragraph", text: "阿姨帶著滿滿的笑聲，也帶著一雙做過無數頓飯的手，在過港社區的灶腳裡，繼續過著她的歡喜日子。" },
        ],
      },
    ],
  },
  {
    slug: "couple-story-one",
    storyNumber: "05",
    name: "清爽阿公 × 阿笑阿嬤",
    role: "相伴四十年的過港夫妻",
    titleLines: ["四十年相伴，", "二十年過港"],
    subtitleLines: ["——笑聲裡的夫妻日常"],
    description: "清爽阿公與阿笑阿嬤相伴四十年，在過港生活二十年，一起參與社區、學習新事物，也在笑聲裡過著退休後的夫妻日常。",
    heroImage: {
      src: "/images/people/couple-story-one/qingshuang-axiao-portrait.jpg",
      alt: "清爽阿公與阿笑阿嬤坐在過港社區協會裡合影",
      caption: "清爽阿公與阿笑阿嬤，相伴四十年的夫妻日常。",
    },
    sections: [
      {
        heading: "笑了就爽 爽了就笑",
        blocks: [
          { type: "paragraph", text: "走進過港社區協會，總能聽見笑聲從屋裡屋外傳來。這裡有一對讓人感到歡樂的逗趣夫妻——阿公名字叫清爽，阿嬤名字叫阿笑。" },
          { type: "paragraph", text: "身邊的朋友們都笑稱這是「笑了就爽，爽了就笑」" },
          { type: "quote", text: "阿公也笑著說：「我們的名字真的是絕配。」" },
          { type: "paragraph", text: "兩人的名字連在一起，彷彿就註定了這輩子要把歡笑帶到每一個角落。只要他們一出現，現場的氣氛總會輕鬆愉快起來。" },
          { type: "paragraph", text: "加入協會兩年來，清爽阿公和阿笑阿嬤早已成了大家熟悉的身影。他們走到哪裡，笑聲就跟到哪裡，彷彿是讓協會充滿歡樂的般的存在。" },
        ],
      },
      {
        heading: "在協會裡學新知、交朋友",
        blocks: [
          { type: "paragraph", text: "對清爽阿公和阿笑嬤來說，退休後的日子並沒有因此慢下來。兩人常常一起到過港社區協會上課、參加活動，久而久之，協會也成了生活裡熟悉的一個地方。在這裡，他們認識了不少聊得來的朋友，也接觸到許多過去沒有機會嘗試的新事物。" },
          { type: "paragraph", text: "清爽阿公尤其喜歡研究新東西。來到協會後，他學會用 AI 製作圖片，回家也常自己摸索、研究，做出作品後，再分享給親朋好友和鄰居。退休之後，多了時間，也多了以前工作時沒空嘗試的興趣。" },
          { type: "quote", text: "「以前上班沒什麼時間放鬆，現在退休了來協會這邊活動，跟朋友聊聊天，蠻不錯的。」" },
          { type: "paragraph", text: "除了上課、研究 AI，阿公也是協會裡的環保志工。平時只要有社區環境整理的活動，他便跟著大家一起忙，掃掃地、整理環境，為熟悉的街坊盡一份心力。" },
          { type: "paragraph", text: "學習新事物、參與社區活動，也和一群老朋友說說笑笑，" },
          { type: "quote", text: "正如阿公說的：「退休後的生活，比想像中熱鬧了些。」" },
        ],
        image: {
          src: "/images/people/couple-story-one/qingshuang-axiao-community.jpg",
          alt: "清爽阿公與阿笑阿嬤在過港社區協會展示作品",
          caption: "兩人在協會裡學習新事物，也結交熟悉的朋友。",
        },
      },
      {
        heading: "鐵道歲月的奔波與守護",
        blocks: [
          { type: "paragraph", text: "回顧這段走過四十多年的婚姻，兩人的緣分帶著幾分奇妙。當年誤打誤撞經由同事牽線，個性活潑的阿公遇上了較為保守的阿嬤，兩個性格截然不同的人，共同組織起一個家庭，互相扶持，一路走過四十年歲月。" },
          { type: "paragraph", text: "年輕時，阿公擔任鐵道列車長，為了扛起一家人的生計，總得配合輪班，長時間在外奔波。早出晚歸成了生活常態，也因此少有時間陪伴家人。" },
          { type: "paragraph", text: "而在阿公忙於列車勤務的那些日子裡，阿笑嬤則留在家中，默默扛起照顧年邁公公與三名子女的責任。從孩子的生活起居，到家裡大大小小的事，她總是一一打理妥當。" },
          { type: "paragraph", text: "夫妻倆一個忙於工作、一個守著家庭，雖然作息不一、聚少離多，生活中也免不了為了瑣事鬥嘴，但這些日常拌嘴在旁人眼裡，反倒像是一種老夫老妻之間特有的、幼稚又可愛的互動。" },
          { type: "paragraph", text: "回頭看這一路走來的歲月，阿公心裡始終有著一份深深的感念。最讓他感謝的，便是阿笑嬤始終把家裡照顧得妥妥當當，讓他能夠放心地在外工作，也讓這個家有一個安穩的依靠。" },
        ],
      },
      {
        heading: "水患之後的安居",
        blocks: [
          { type: "paragraph", text: "原本住在八堵一帶的兩人，幾年前因一場突如其來的嚴重水災，家園遭受淹水，也因此決定搬遷到過港。沒想到一住，就是二十年。" },
          { type: "paragraph", text: "對他們而言，過港早已不只是安身立命的住所。他們在這裡認識鄰居、結交朋友，也在社區協會裡留下許多共同的回憶。二十年來，兩人的生活早已一點一滴與過港交織在一起。" },
          { type: "paragraph", text: "如今，在協會裡總能看見兩人的身影。偶爾拌拌嘴，偶爾一起參與活動，也和身邊的鄰居說說笑笑。四十多年的婚姻、二十年的過港歲月，他們就像是過港社區裡最耀眼的陽光，把每一天都過得清爽、開懷，也讓所有人都感染了那份「笑了就爽，爽了就笑」的豁達。" },
        ],
      },
    ],
  },
];

export function getPeopleStory(slug: string) {
  return PEOPLE_STORIES.find((story) => story.slug === slug);
}

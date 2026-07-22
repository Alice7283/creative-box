    const STORAGE_KEY = 'flowerbox2-message-tool-v1';

    const fieldDefs = {
      name: { label: '客人稱呼', placeholder: '例如：王小姐', type: 'text' },
      date: { label: '租借日期', type: 'date' },
      start: { label: '開始時間', type: 'time' },
      end: { label: '結束時間', type: 'time' },
      duration: { label: '租借時數', placeholder: '例如：3H', type: 'text' },
      purpose: { label: '活動用途', placeholder: '例如：親子講座', type: 'text' },
      people: { label: '預計人數', placeholder: '例如：18人', type: 'text' },
      rent: { label: '場租費', placeholder: '例如：1400', type: 'number', prefix: 'NT$' },
      deposit: { label: '押金', placeholder: '例如：500', type: 'number', prefix: 'NT$' },
      total: { label: '付款總額', placeholder: '例如：1900', type: 'number', prefix: 'NT$' },
      minutes: { label: '超時分鐘', placeholder: '例如：20', type: 'number', suffix: '分鐘' },
      company: { label: '公司抬頭', type: 'text' },
      taxId: { label: '統一編號', type: 'text', inputmode: 'numeric' },
      amount: { label: '發票金額', type: 'number', prefix: 'NT$' },
      address: { label: '收件地址（含郵遞區號）', type: 'textarea', full: true },
      recipient: { label: '收件人', type: 'text' },
      phone: { label: '聯絡電話', type: 'tel' },
      visitDate: { label: '場勘日期', type: 'date' },
      visitTime: { label: '抵達時間', type: 'time' },
      testTv: { label: '投影設備', type: 'select', options: ['需要測試投影設備', '不需要測試投影設備'] }
    };

    const categories = [
      { id: 'welcome', label: '接待與詢價' },
      { id: 'booking', label: '預約與付款' },
      { id: 'visit', label: '場勘與設備' },
      { id: 'event', label: '飲食與活動' },
      { id: 'day', label: '活動當日與離場' },
      { id: 'after', label: '售後與其他' }
    ];

    const templates = [
      {
        id: 'welcome', category: 'welcome', title: '新好友迎賓', summary: '加入LINE後的第一則訊息',
        hint: '加入好友後可直接傳送的固定迎賓訊息。', fields: [],
        body: `我是花盒空間二館（南陽街）。
感謝您加入好友 😊

這裡是花盒空間（二館）租用場地官方帳號
空間租借不分平假日，歡迎提早預約☺️

🌼台北市中正區南陽街38巷2號2樓
🌼歡迎預約時間自助參觀
🌼租借場地押金$500-1000元，桌椅可自由排列，恢復場地原樣、垃圾帶走即可退還押金
🌼花盒空間付款預約後沒有取消及退費服務，僅能於56小時前提出延期使用空間乙次申請，超過56小時則無法取消和退費
🌼花盒二館租借當日無法臨時加時，請務必將場佈場復時間計算進租借時區間哦
🌼本場地採「先付款、先保留」的原則，未付款前恕不提供保留服務。`
      },
      {
        id: 'inquiry', category: 'welcome', title: '初次詢價', summary: '價格、設備與資料收集',
        hint: '適合客人第一次詢問價格或檔期。', fields: [],
        body: `您好，我們是花盒二館 😊

📍臺北市中正區南陽街38巷2號2樓，可導航「綠豆蒜製研所」

場地不分平假日，2小時起租：
• 每小時NT$400
• 4小時NT$1,400
• 10小時NT$3,000
• 超過10小時，每增加1小時NT$300

現場提供55吋電視、白板、Wi-Fi、延長線、20張靠背椅及6張圓凳／高腳椅，多張桌子可依活動需求排列。

請提供以下資訊，我們幫您確認檔期：
1. 租借日期
2. 開始及結束時間
3. 活動用途
4. 預計人數
5. 是否使用電視
6. 是否攜帶外食、外燴或寵物`
      },
      {
        id: 'slot_payment', category: 'booking', title: '檔期可預約／請款', summary: '填寫時段、場租與押金',
        hint: '總額若未填寫，會自動用場租費加押金計算。銀行資訊已包含在訊息中。', fields: ['date','start','end','duration','rent','deposit','total'],
        body: `🌼 感謝您租借花盒二館
台北市中正區南陽街38巷2號2樓

📅 {{date}}  {{start}}-{{end}}  {{duration}}
費用\${{rent}} + {{deposit}}元清潔費押金 =
\${{total}}

💰 請匯款至
玉山銀行808
分行：新莊副都心分行
帳號：0602979081250

💡 匯款後請提供：
1. 匯款後五碼與匯款日期，或匯款截圖
2. 注意事項圖片請簽名後回傳
3. 請提供清潔費押金退款帳戶資訊；場地使用完畢後，也請主動通知我們場地已恢復完畢並申請退款
4. 當天會到現場的聯絡人姓名＋手機
5. 活動名稱或使用目的／預計使用人數

🌟 確認租借時須一次付清場租費與押金。場地採「先付款、先保留」原則，完成付款後才會正式保留時段；未匯款前，花盒空間不會為您保留活動日期與時間。

🌟 此報價送出後1小時內若尚未完成付款，請再次與客服確認場地是否仍可租用。場地以完成付款的順序為準，僅詢問不代表已成功保留。

🌟 提醒您：場佈、活動、清潔及場地復原都須包含在租借時段內。`
      },
      {
        id: 'paid', category: 'booking', title: '付款完成確認', summary: '完整列出預約資料',
        hint: '確認款項後傳送，留下雙方可核對的預約紀錄。', fields: ['name','date','start','end','rent','deposit'],
        body: `{{name}}您好，已收到您的款項，以下預約已完成：

• 日期：{{date}}
• 時間：{{start}}–{{end}}
• 場租費：NT$ {{rent}}
• 押金：NT$ {{deposit}}

付款後不能取消或退款。如需延期，最晚須於原租借時間56小時前提出，每筆預約限延期一次。`
      },
      {
        id: 'postpone', category: 'booking', title: '延期規則', summary: '一般延期的完整說明',
        hint: '客人詢問改期時使用。', fields: ['name'],
        body: `{{name}}您好，完成付款後不能取消或退款，但最晚可於原租借時間56小時前申請延期一次。

一般延期須於原租借日起3個月內使用完畢。延期時可以增加租借時數，但不能減少，也不能將原預約拆成多次使用；若新安排涵蓋多個日期，請先提供日期與時段，由客服另行確認。`
      },
      {
        id: 'typhoon', category: 'booking', title: '颱風延期', summary: '台北市停班停課適用',
        hint: '只有台北市政府公告停班停課時使用。', fields: ['name'],
        body: `{{name}}您好，若台北市政府公告停班停課，我們可以協助將場地租借延期一次，但無法取消或退款。延期後須於原租借日起2個月內使用完畢，謝謝您的理解。`
      },
      {
        id: 'setup_time', category: 'booking', title: '場佈與撤場時間', summary: '提前10分鐘進場，其餘需含在租借時段',
        hint: '客人詢問是否提供場佈或撤場時間時使用。', fields: ['name'],
        body: `{{name}}您好，我們有提供提前10分鐘進場準備。

超過這10分鐘以外的時間，場佈、活動、清潔與撤場都請包含在租用時段中。若超過租借時間離場，會額外收取一小時超時費NT$450。`
      },
      {
        id: 'visit_ask', category: 'visit', title: '收集場勘資料', summary: '請客人提供日期與時間',
        hint: '客人表示想參觀，但還沒提供完整資料時使用。', fields: ['name'],
        body: `{{name}}您好，場勘原則上安排於平日10:30–18:20之間，場勘時間預設為20分鐘。

請提供：
1. 希望場勘的日期
2. 預計抵達時間
3. 是否需要測試電視投影

我們幫您確認希望場勘的日期和時段，是否有其他客人租用，稍後回覆，謝謝。`
      },
      {
        id: 'visit_confirm', category: 'visit', title: '場勘確認', summary: '填寫參觀日期、時間與設備',
        hint: '場勘時間確認後使用。', fields: ['name','visitDate','visitTime','testTv'],
        body: `{{name}}您好，已為您安排於{{visitDate}} {{visitTime}}參觀花盒二館，場勘時間預設為20分鐘。

花盒二館和一樓綠豆蒜製研所共用入口。抵達後請禮貌告知一樓店員您要參觀二樓，再直接上樓即可。場勘採自助方式，有問題可透過LINE詢問。

場勘期間沒有封場，可能會有一樓用餐客人。如需搬動桌椅或有其他可能影響客人的需求，請先和一樓店員溝通。若超過預約場勘時間，也請至一樓點一杯飲品。

投影設備：{{testTv}}。如需測試，建議攜帶實際會使用的電腦及所需轉接頭。`
      },
      {
        id: 'visit_after', category: 'visit', title: '場勘結束後', summary: '場勘後確認租借與付款提醒',
        hint: '客人場勘後表示有興趣租借時使用。', fields: ['name'],
        body: `{{name}}您好，場勘完如果確定要租借，請提供開始和結束時段。

場佈、活動、清潔及場地復原都需要包含在租借時段內。我們會提供預約資訊和場地規範給您，付款後才能保留場地。`
      },
      {
        id: 'capacity', category: 'visit', title: '桌椅與容納人數', summary: '不直接承諾固定容量',
        hint: '適合回答「可以坐幾個人」。', fields: ['name'],
        body: `{{name}}您好，桌椅資訊如下：

有桌子座位：
• 靠背椅子20張
• 高腳椅6張

沒有桌子：
• 圓形椅凳6張

至於可容納多少人，建議您可以預約來場勘看看。我們的場地也有人辦過室內快閃市集，您可以到現場評估您的活動性質合適的人數。桌椅資訊如上，先提供影片供您參考看看喔。`
      },
      {
        id: 'tv', category: 'visit', title: '電視投影使用', summary: 'HDMI與轉接頭提醒',
        hint: '客人詢問投影設備時使用。', fields: ['name'],
        body: `{{name}}您好，現場可免費使用55吋電視。若需要使用，請在預約場地或場勘時事先告知。

現場提供一條HDMI線；若您的電腦需要轉接頭，請自行準備。使用完畢後，請將遙控器放回指定位置。`
      },
      {
        id: 'speaker_mic', category: 'visit', title: '麥克風與喇叭', summary: '沒有麥克風，只有小藍牙喇叭',
        hint: '客人詢問現場是否有麥克風或喇叭時使用。', fields: ['name'],
        body: `{{name}}您好，我們現場只有一顆小小的藍牙喇叭，沒有提供麥克風。

如果活動需要麥克風或較大音量的擴音設備，需要請您自行準備喔～`
      },
      {
        id: 'food', category: 'event', title: '外食與外燴', summary: '餐點、清潔與垃圾原則',
        hint: '客人詢問是否能帶食物時使用。', fields: ['name'],
        body: `{{name}}您好，場地可以攜帶外食或叫外燴，也可以向一樓綠豆蒜製研所點餐後在二樓享用。

1. 如果是點一樓綠豆蒜製研所餐點，一樓店員會上來回收台收餐具。

2. 附近外燴廠商推薦：
https://www.ussbakery.com.tw/party-snack.htm

一樓綠豆蒜可提供外燴取餐、擺盤、外燴餐具廚餘收拾、歸還飲料桶的服務，費用計算方式為：外燴餐點費用 × 30%，最低收費NT$1,500／場。

🌸 外燴產生的垃圾：
限兩袋14公升，垃圾袋二樓白色櫃子中有，需請您自行打包拿到樓下；代收垃圾費用NT$1,000。

如果不需要此項服務也OK，您也可以自行處理，我們就不會額外收費。

3. 任何除一樓綠豆蒜之外的餐點，請自己清理帶走，不收取清潔費。

4. 無論是自己帶走垃圾，或是我們代丟垃圾，請務必在離場前恢復場地；違者將扣除押金恕不退還。`
      },
      {
        id: 'trash', category: 'event', title: '垃圾代丟服務', summary: '兩袋14公升／NT$1,000',
        hint: '這項服務不包含清潔，訊息中已特別說明。', fields: ['name'],
        body: `{{name}}您好，如不方便自行帶走垃圾，可加購「垃圾代丟服務」，費用NT$1,000，限兩袋14公升垃圾。

垃圾袋在二樓白色櫃子中，請自行完成垃圾分類及裝袋，並拿到樓下指定位置；本服務只包含後續垃圾丟棄，不包含桌面、地板、餐具、廚餘或場地清潔。

無論是自己帶走垃圾，或是我們代丟垃圾，請務必在離場前恢復場地；違者將扣除押金恕不退還。`
      },
      {
        id: 'restaurant', category: 'event', title: '一樓餐飲與茶水', summary: '獨立營運與茶水價格',
        hint: '借冰、點餐、茶水等問題使用。', fields: ['name'],
        body: `{{name}}您好，花盒二館與一樓綠豆蒜製研所是獨立營運。

若每位客人皆向一樓點餐，一樓可提供茶水一壺及紙杯；沒有點餐但需要茶水與紙杯，一壺為NT$200，可續壺。借冰或其他店家服務請另外禮貌詢問，一樓店家可依現場情況決定是否提供。`
      },
      {
        id: 'pet', category: 'event', title: '寵物友善', summary: '落地、植物與清潔規則',
        hint: '客人詢問能不能帶寵物時使用。', fields: ['name'],
        body: `{{name}}您好，可以喔，我們是寵物友善空間 😊

寵物在不影響其他人的情況下可以落地，但請避免碰觸或損傷現場植物及物品。也請自行準備寵物清潔用抹布，如有便溺，須立即清理乾淨。`
      },
      {
        id: 'decoration', category: 'event', title: '黏貼與佈置', summary: '殘膠與物品移動提醒',
        hint: '客人詢問派對或活動佈置時使用。', fields: ['name'],
        body: `{{name}}您好，如果需要在窗戶或牆面黏貼佈置，退場前務必清理乾淨，不能留下殘膠。現場有除膠劑，如有需要可禮貌向一樓店員借用。

未經允許請勿搬動或觸摸植物、畫作、裝飾物及軌道燈。`
      },
      {
        id: 'party_vendor', category: 'event', title: '性別派對／抓周服務', summary: '轉介配合廠商',
        hint: '客人詢問性別派對、抓周、派對佈置服務時使用。', fields: ['name'],
        body: `{{name}}您好，若您需要性別派對或抓周服務，請直接諮詢我們配合的廠商喔：

https://www.instagram.com/thing_flowers/`
      },
      {
        id: 'restore', category: 'day', title: '場地復原提醒', summary: '離場前清潔、設備與工具確認',
        hint: '活動前或接近離場時傳送。', fields: ['name'],
        body: `{{name}}您好，離場前請協助確認：

1. 桌椅恢復原位
2. 桌面及地面清潔
3. 垃圾帶走或依垃圾代丟服務完成裝袋
4. 窗戶及使用過的設備確認完畢
5. 電視及冷氣遙控器放回指定位置；電視布／設備保護布也請恢復原狀
6. 黏貼佈置及殘膠清除乾淨
7. 掃把、抹布使用完畢後歸位；抹布請清洗乾淨並晾回原位

遙控器未歸位雖然看似小事，但若隔天找不到會影響後續客人使用，請務必協助確認。

一樓店員可協助保留掃把或提供必要物品位置，但場地清潔、桌椅復原、垃圾整理與設備歸位仍需由租借方自行完成。

場地復原完成並確認無損後，我們會依規定退還押金，謝謝。`
      },
      {
        id: 'remote_access', category: 'day', title: '自行拿遙控器', summary: '非一樓營業時間自行開關門提醒',
        hint: '租借時段非一樓營業時間，需要客人自行開關門時使用。', fields: ['name'],
        body: `Hi {{name}}～

由於貴單位租借的時段非一樓店家營業時間，需要由你們自行開關門。

🩷 我們遙控器密碼盒放在門口信箱裡面。

詳細可以參考圖片或影片，場地規範也一起提供給你們。另外LINE檔案可能會過期，記得存檔保存，謝謝。`
      },
      {
        id: 'offhours', category: 'day', title: '營業時間外提醒', summary: '公開版安全提醒',
        hint: '只提供概要；門鎖與保全細節另以訂位後操作說明傳送。', fields: ['name','date','start','end'],
        body: `{{name}}您好，您預約的{{date}} {{start}}–{{end}}包含綠豆蒜製研所營業時間外時段，我們會另外提供進出及離場操作說明。

請特別注意：一樓鐵門開啟時，必須有人留在一樓看顧；若所有人都在二樓，鐵門必須完全關閉。完整的鑰匙、門窗、電源及保全操作，會在訂位完成後個別提供。`
      },
      {
        id: 'security_open', category: 'day', title: '開保全提醒', summary: '需要客人自行開門與開保全時使用',
        hint: '客人需要自行開啟鐵門、進場與使用空間時使用。', fields: ['name'],
        body: `{{name}}您好，重要提醒，請務必詳閱：

1. 請依約定時間開啟鐵門。時間沒到就開鐵門，保全警鈴會大響，保全公司和警察會以為遭竊衝到現場。

2. 非常重要！！！一樓鐵門開著的時候，一定要有人。反之如果人都在二樓，一樓鐵門請完全關閉，避免有心人士竊盜或損毀空間。經監視器發現鐵門開啟且無人在一樓值守，將全額扣除押金，還請諒解我們需要顧及空間安全。

3. 不得觸摸植物、搬運畫作或其他擺飾，不得擅自調整燈光。

4. 離場時請恢復場地、桌椅歸位、垃圾帶走；廁所除生理用品外，不要遺留外來垃圾。

5. 離場時請特別檢查，每一扇門窗都要「鎖上」，否則保全無法設定。

6. 超過19:00後離場，請關閉所有電源，包含1+2F電燈、電扇、3台冷氣；遙控器歸位，並歸還鑰匙、撥亂密碼。

7. 以上規定違者將沒收押金。

🌸 林小姐 0901327057`
      },
      {
        id: 'security_close', category: 'day', title: '關保全提醒', summary: '需要客人自行關門與鎖保全時使用',
        hint: '客人需要自行離場、關門並聯繫我們鎖保全時使用。', fields: ['name'],
        body: `{{name}}您好，重要提醒，請務必詳閱：

1. 非常重要！！！一樓鐵門開著的時候，一定要有人。反之如果人都在二樓，一樓鐵門請完全關閉，避免有心人士竊盜或損毀空間。經監視器發現鐵門開啟且無人在一樓值守，將全額扣除押金，還請諒解我們需要顧及空間安全。

2. 不得觸摸植物、搬運畫作或其他擺飾，不得擅自調整燈光。

3. 離場時請恢復場地、桌椅歸位、垃圾帶走；廁所除生理用品外，不要遺留外來垃圾。

4. 離場時請特別檢查，每一扇門窗都要「鎖上」，否則保全無法設定。

5. 超過19:00後離場，請關閉所有電源，包含1+2F電燈、電扇、3台冷氣；遙控器歸位，並歸還鑰匙、撥亂密碼。

6. 以上規定違者將沒收押金。

7. 降下鐵門並放好鑰匙後，請不要立即離開。請電話聯繫我們，通知可以鎖保全了，我們會立即上鎖，鎖定好後會LINE通知您可以離開了；萬一「上鎖保全失敗」，可能是有門窗沒有上鎖，導致保全無法設定，我們會通知您上樓檢查門窗，謝謝。

🌸 林小姐 0901327057`
      },
      {
        id: 'staff_left_checkout', category: 'day', title: '店員離開後離場提醒', summary: '樓下店員已離開時的離場確認',
        hint: '樓下店員已離開、客人需自行確認離場事項時使用。', fields: ['name'],
        body: `Hi {{name}}～

今天離開的時候如果樓下店員已經離開，要麻煩你務必確認：

① 桌椅恢復原位
② 窗戶已鎖上
③ 冷氣關閉
④ 一樓、二樓電燈關閉
⑤ 垃圾帶走
⑥ 最後一位離開後，確認鐵門關閉或後門已鎖上，請聯絡我們將保全遠端鎖上：0901327057 林小姐

最後，遙控器要記得放回鑰匙盒哦！

店員離開前會把掃把、冷氣和電視遙控器放在1樓回收台。`
      },
      {
        id: 'deposit_deduction', category: 'day', title: '扣押金提醒', summary: '場地未復原或違規時使用',
        hint: '客人需要被提醒押金扣款規則時使用，可依實際情況微調。', fields: ['name'],
        body: `{{name}}您好，提醒您，押金退還的前提是場地依規定完成復原，並確認現場無損壞、遺失或違反使用規範。

若離場後發現垃圾未帶走、桌椅未歸位、場地未清潔、門窗未鎖、電源或冷氣未關閉、遙控器或鑰匙未歸位、擅自移動／損傷植物畫作與設備，或造成其他需要清潔、修復、人員處理的狀況，將依實際情況自押金中扣除相關費用。

若損失或處理費用超過押金金額，需另行補足差額。謝謝您的理解與配合。`
      },
      {
        id: 'overtime', category: 'day', title: '實際超時提醒', summary: '填寫實際超時分鐘',
        hint: '活動結束後發現逾時時使用。', fields: ['name','minutes'],
        body: `{{name}}您好，感謝您今天使用花盒二館 🤍

今天實際離場時間比原定租借時間超過約{{minutes}}分鐘。由於管理人員須在線等候客人完成離場及保全設定，未經確認而逾時會產生額外人力成本，將依規定以NT$450／時計費。

下次若活動時間可能延後，建議預約時多保留場佈、清潔及場地復原時間，並務必依原訂時間完成離場，謝謝您的配合。`
      },
      {
        id: 'invoice', category: 'after', title: '發票資料收集', summary: '填寫後直接產生完整資料',
        hint: '也可只複製空白欄位，請客人自行回填。', fields: ['name','company','taxId','amount','address','recipient','phone'],
        body: `{{name}}您好，可以開立發票，請確認以下資料，我們會在使用完場地後寄出：

• 公司抬頭：{{company}}
• 統一編號：{{taxId}}
• 品名：空間租借
• 金額：NT$ {{amount}}
• 收件地址（含郵遞區號）：{{address}}
• 收件人：{{recipient}}
• 聯絡電話：{{phone}}`
      },
      {
        id: 'venue1', category: 'after', title: '轉介花盒一館', summary: '一館地址與LINE',
        hint: '二館不適合或客人主動詢問一館時使用。', fields: ['name'],
        body: `{{name}}您好，花盒一館也在附近，地址是臺北市中正區懷寧街62號5樓501室。

預約一館或詢問其他問題，可加入LINE：
https://lin.ee/HR5CEgy`
      }
    ];

    const state = loadState();
    let activeCategory = state.activeCategory || categories[0].id;
    let openTemplates = new Set(Array.isArray(state.openTemplates) ? state.openTemplates : []);
    let query = '';

    const categoryBar = document.querySelector('#categoryBar');
    const messageList = document.querySelector('#messageList');
    const categoryTitle = document.querySelector('#categoryTitle');
    const searchEl = document.querySelector('#search');
    const statusEl = document.querySelector('#status');

    function loadState() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { values: {} }; }
      catch { return { values: {} }; }
    }

    function saveState() {
      state.activeCategory = activeCategory;
      state.openTemplates = [...openTemplates];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // 直接以 file:// 開啟時，部分瀏覽器會禁止 localStorage。
        // 儲存失敗不應阻止分類切換、欄位填寫或複製訊息。
      }
    }

    function renderCategories() {
      categoryBar.querySelectorAll('[data-category]').forEach(button => {
        const isActive = button.dataset.category === activeCategory;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    }

    function filteredTemplates() {
      const needle = query.trim().toLowerCase();
      return templates.filter(template => {
        const inCategory = template.category === activeCategory;
        const matches = !needle || `${template.title} ${template.summary} ${template.body}`.toLowerCase().includes(needle);
        return inCategory && matches;
      });
    }

    function renderMessageList() {
      const list = filteredTemplates();
      const currentCategory = categories.find(category => category.id === activeCategory);
      categoryTitle.textContent = currentCategory ? currentCategory.label : '';
      if (!list.length) {
        messageList.innerHTML = '<div class="empty">這個分類找不到符合的訊息</div>';
        return;
      }
      messageList.innerHTML = list.map((template, index) => renderCard(template, index)).join('');
    }

    function fieldValue(templateId, fieldId) {
      return state.values && state.values[templateId] && state.values[templateId][fieldId]
        ? state.values[templateId][fieldId]
        : '';
    }

    function renderCard(template, index) {
      const isOpen = openTemplates.has(template.id);
      const fields = template.fields.length
        ? `<div class="fields">${template.fields.map(fieldId => renderField(template, fieldId)).join('')}</div>
           <button class="reset-btn" data-reset="${template.id}" type="button">清除這張卡片的填寫內容</button>`
        : '<div class="empty">這份訊息不需要填寫資料，可直接複製。</div>';
      return `
        <article class="message-card ${isOpen ? 'open' : ''}" data-card="${template.id}">
          <button class="message-summary" data-toggle="${template.id}" type="button" aria-expanded="${isOpen}">
            <span class="number">${String(index + 1).padStart(2, '0')}</span>
            <span><h3 class="message-title">${template.title}</h3><p class="message-description">${template.summary}</p></span>
            <span class="open-label">${isOpen ? '收合內容 ↑' : '展開使用 ↓'}</span>
          </button>
          <div class="message-body">
            <p class="hint">${template.hint}</p>
            <div class="editor-grid">
              <div class="input-area">
                <p class="section-label">需要填寫的資料</p>
                ${fields}
              </div>
              <div class="output-area">
                <div class="preview-head">
                  <p class="section-label">可直接傳送的訊息</p>
                  <button class="copy-btn" data-copy="${template.id}" type="button">複製訊息</button>
                </div>
                <textarea class="preview" data-preview="${template.id}" aria-label="${template.title}訊息預覽">${escapeHtml(generateMessage(template))}</textarea>
                <p class="preview-note">預覽區可以在複製前直接修改。</p>
              </div>
            </div>
          </div>
        </article>`;
    }

    function renderField(template, fieldId) {
        const def = fieldDefs[fieldId];
        const value = escapeHtml(fieldValue(template.id, fieldId));
        const fullClass = def.full || def.type === 'textarea' ? 'full' : '';
        const controlId = `${template.id}-${fieldId}`;
        let control;
        if (def.type === 'textarea') {
          control = `<textarea id="${controlId}" data-template-field="${template.id}" data-field="${fieldId}" placeholder="${def.placeholder || ''}">${value}</textarea>`;
        } else if (def.type === 'select') {
          control = `<select id="${controlId}" data-template-field="${template.id}" data-field="${fieldId}" style="width:100%;border:1px solid var(--line);border-radius:12px;padding:11px 12px;background:white">
            <option value="">請選擇</option>
            ${def.options.map(option => `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`).join('')}
          </select>`;
        } else {
          control = `<input id="${controlId}" data-template-field="${template.id}" data-field="${fieldId}" type="${def.type || 'text'}" value="${value}" placeholder="${def.placeholder || ''}" ${def.inputmode ? `inputmode="${def.inputmode}"` : ''}>`;
        }
        const helper = def.prefix || def.suffix ? `<div class="helper">輸出格式：${def.prefix || ''}填寫內容${def.suffix || ''}</div>` : '';
        return `<div class="field ${fullClass}"><label for="${controlId}">${def.label}</label>${control}${helper}</div>`;
    }

    function handleFieldInput(event) {
      const template = templates.find(item => item.id === event.target.dataset.templateField);
      if (!template) return;
      if (!state.values) state.values = {};
      if (!state.values[template.id]) state.values[template.id] = {};
      state.values[template.id][event.target.dataset.field] = event.target.value;

      if (template.id === 'slot_payment' && ['rent','deposit'].includes(event.target.dataset.field)) {
        const values = state.values[template.id];
        if (!values.total || values.totalAuto) {
          values.total = String((Number(values.rent) || 0) + (Number(values.deposit) || 0));
          values.totalAuto = true;
          const totalInput = messageList.querySelector(`[data-template-field="${template.id}"][data-field="total"]`);
          if (totalInput) totalInput.value = values.total;
        }
      }
      if (template.id === 'slot_payment' && event.target.dataset.field === 'total') {
        state.values[template.id].totalAuto = false;
      }
      saveState();
      updatePreview(template);
    }

    function formatValue(fieldId, raw) {
      if (!raw) return `［請填${fieldDefs[fieldId] ? fieldDefs[fieldId].label : fieldId}］`;
      if (fieldDefs[fieldId] && fieldDefs[fieldId].type === 'date') {
        const [year, month, day] = raw.split('-');
        const weekLabels = ['日','一','二','三','四','五','六'];
        const weekday = weekLabels[new Date(Number(year), Number(month) - 1, Number(day)).getDay()];
        return `${year}/${Number(month)}/${Number(day)}(${weekday})`;
      }
      return raw.trim ? raw.trim() : raw;
    }

    function generateMessage(template) {
      const values = state.values && state.values[template.id] ? state.values[template.id] : {};
      let output = template.body.replace(/{{(\w+)}}/g, (_, fieldId) => formatValue(fieldId, values[fieldId]));
      output = output.replace(/^［請填客人稱呼］您好/g, '您好');
      return output;
    }

    function updatePreview(template) {
      const preview = messageList.querySelector(`[data-preview="${template.id}"]`);
      if (preview) preview.value = generateMessage(template);
    }

    function selectCategory(categoryId) {
      activeCategory = categoryId;
      query = '';
      searchEl.value = '';
      saveState();
      renderAll();
    }

    function renderAll() {
      renderCategories();
      renderMessageList();
    }

    function escapeHtml(value) {
      return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
    }

    function flash(message) {
      statusEl.textContent = message;
      clearTimeout(flash.timer);
      flash.timer = setTimeout(() => statusEl.textContent = '', 2200);
    }

    categoryBar.addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (button) selectCategory(button.dataset.category);
    });

    searchEl.addEventListener('input', event => {
      query = event.target.value;
      renderMessageList();
    });

    messageList.addEventListener('click', async event => {
      const toggle = event.target.closest('[data-toggle]');
      if (toggle) {
        const templateId = toggle.dataset.toggle;
        openTemplates.has(templateId) ? openTemplates.delete(templateId) : openTemplates.add(templateId);
        saveState();
        renderMessageList();
        return;
      }

      const copy = event.target.closest('[data-copy]');
      if (copy) {
        const preview = messageList.querySelector(`[data-preview="${copy.dataset.copy}"]`);
        try {
          await navigator.clipboard.writeText(preview.value);
        } catch {
          preview.select();
          document.execCommand('copy');
        }
        flash('已複製，可以貼到LINE');
        return;
      }

      const reset = event.target.closest('[data-reset]');
      if (reset) {
        if (state.values && state.values[reset.dataset.reset]) delete state.values[reset.dataset.reset];
        saveState();
        renderMessageList();
        flash('這張卡片已清除');
      }
    });

    messageList.addEventListener('input', event => {
      if (event.target.matches('[data-template-field]')) handleFieldInput(event);
    });

    messageList.addEventListener('change', event => {
      if (event.target.matches('[data-template-field]')) handleFieldInput(event);
    });

    renderAll();

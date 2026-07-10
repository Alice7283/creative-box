    const STORAGE_KEY = 'flowerbox2-message-tool-v1';

    const fieldDefs = {
      name: { label: '客人稱呼', placeholder: '例如：王小姐', type: 'text' },
      date: { label: '租借日期', type: 'date' },
      start: { label: '開始時間', type: 'time' },
      end: { label: '結束時間', type: 'time' },
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
        hint: '可填客人稱呼；其餘是固定的基本資訊。', fields: ['name'],
        body: `{{name}}您好！我是花盒二館（南陽街），感謝您加入好友 😊

這裡是花盒二館的場地租借官方帳號，空間租借不分平假日，歡迎提早預約。

🌼 地址：臺北市中正區南陽街38巷2號2樓，可導航「綠豆蒜製研所」
🌼 台北車站M6出口步行約5分鐘
🌼 台大醫院站4號出口步行約3分鐘
🌼 歡迎預約時段自助參觀

租借押金為NT$500–1,000。離場前將桌椅恢復原位、垃圾帶走並完成場地復原，確認無誤後即可退還押金。

付款後不提供取消及退款；最晚可於原租借時間56小時前申請延期一次。場地採「先付款、先保留」原則，僅詢問不代表已成功保留。`
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
        hint: '總額若未填寫，會自動用場租費加押金計算。', fields: ['name','date','start','end','rent','deposit','total'],
        body: `{{name}}您好，{{date}} {{start}}–{{end}}目前可以預約。

場租費為NT$ {{rent}}，押金為NT$ {{deposit}}，合計NT$ {{total}}。

確認租借時須一次付清場租費與押金。場地採先付款、先保留原則，完成付款後才會正式保留時段。

此報價送出後1小時內若尚未完成付款，請再次與客服確認場地是否仍可租用。場地以完成付款的順序為準，僅詢問不代表已成功保留。

提醒您：場佈、活動、清潔及場地復原都須包含在租借時段內。`
      },
      {
        id: 'paid', category: 'booking', title: '付款完成確認', summary: '完整列出預約資料',
        hint: '確認款項後傳送，留下雙方可核對的預約紀錄。', fields: ['name','date','start','end','purpose','people','rent','deposit'],
        body: `{{name}}您好，已收到您的款項，以下預約已完成：

• 日期：{{date}}
• 時間：{{start}}–{{end}}
• 用途：{{purpose}}
• 人數：{{people}}
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
        id: 'extend', category: 'booking', title: '當日申請延長', summary: '須在結束前2小時詢問',
        hint: '回覆臨時想延長時數的客人。', fields: ['name','date','start','end'],
        body: `{{name}}您好，若租借當日臨時需要延長，最晚須於原定結束時間前2小時聯繫客服。

您原訂時段為{{date}} {{start}}–{{end}}。我們會確認後續檔期及管理安排，回覆是否可以延長；收到確認前，請仍以原定時間完成離場。

未經確認而實際逾時，將以NT$450／時計費。`
      },
      {
        id: 'visit_ask', category: 'visit', title: '收集場勘資料', summary: '請客人提供日期與時間',
        hint: '客人表示想參觀，但還沒提供完整資料時使用。', fields: ['name'],
        body: `{{name}}您好，場勘原則上安排於平日10:30–18:20之間。

請提供：
1. 希望場勘的日期
2. 預計抵達時間
3. 是否需要測試電視投影

我們確認當時沒有其他客人租用後，再為您安排。`
      },
      {
        id: 'visit_confirm', category: 'visit', title: '場勘確認', summary: '填寫參觀日期、時間與設備',
        hint: '場勘時間確認後使用。', fields: ['name','visitDate','visitTime','testTv'],
        body: `{{name}}您好，已為您安排於{{visitDate}} {{visitTime}}參觀花盒二館。

花盒二館和一樓綠豆蒜製研所共用入口。抵達後請禮貌告知一樓店員您要參觀二樓，再直接上樓即可。場勘採自助方式，有問題可透過LINE詢問。

場勘期間沒有封場，可能會有一樓用餐客人。如需搬動桌椅或有其他可能影響客人的需求，請先和一樓店員溝通。場勘超過20分鐘，也請至一樓點一杯飲品。

投影設備：{{testTv}}。如需測試，建議攜帶實際會使用的電腦及所需轉接頭。`
      },
      {
        id: 'capacity', category: 'visit', title: '桌椅與容納人數', summary: '不直接承諾固定容量',
        hint: '適合回答「可以坐幾個人」。', fields: ['name'],
        body: `{{name}}您好，現場有20張靠背椅、6張圓凳／高腳椅，以及多張可自由排列的桌子。

實際適合人數會因活動形式、桌椅配置及需要保留的動線而不同，因此我們不直接承諾固定容納人數。建議先參考空間影片；若人數較多或活動形式特殊，也可以預約場勘評估。`
      },
      {
        id: 'tv', category: 'visit', title: '電視投影使用', summary: 'HDMI與轉接頭提醒',
        hint: '客人詢問投影設備時使用。', fields: ['name'],
        body: `{{name}}您好，現場可免費使用55吋電視。若需要使用，請在預約場地或場勘時事先告知。

現場提供一條HDMI線；若您的電腦需要轉接頭，請自行準備。使用完畢後，請將遙控器放回指定位置。`
      },
      {
        id: 'food', category: 'event', title: '外食與外燴', summary: '餐點、清潔與垃圾原則',
        hint: '客人詢問是否能帶食物時使用。', fields: ['name'],
        body: `{{name}}您好，場地可以攜帶外食或叫外燴，也可以向一樓綠豆蒜製研所點餐後在二樓享用。

若向一樓點餐，一樓店員會回收其餐具；其他外食及外燴則須自行清理並將垃圾帶走，不另收清潔費。無論垃圾自行帶走或購買垃圾代丟服務，離場前都須完成桌面、地面及場地復原。`
      },
      {
        id: 'trash', category: 'event', title: '垃圾代丟服務', summary: '兩袋14公升／NT$1,000',
        hint: '這項服務不包含清潔，訊息中已特別說明。', fields: ['name'],
        body: `{{name}}您好，如不方便自行帶走垃圾，可加購「垃圾代丟服務」，費用NT$1,000，限兩袋14公升垃圾。

請自行完成垃圾分類及裝袋，並拿到一樓指定位置；本服務只包含後續垃圾丟棄，不包含桌面、地板、餐具、廚餘或場地清潔。`
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
        id: 'restore', category: 'day', title: '場地復原提醒', summary: '離場前六項確認',
        hint: '活動前或接近離場時傳送。', fields: ['name'],
        body: `{{name}}您好，離場前請協助確認：

1. 桌椅恢復原位
2. 桌面及地面清潔
3. 垃圾帶走或依垃圾代丟服務完成裝袋
4. 窗戶及使用過的設備確認完畢
5. 電視及冷氣遙控器放回指定位置
6. 黏貼佈置及殘膠清除乾淨

場地復原完成並確認無損後，我們會依規定退還押金，謝謝。`
      },
      {
        id: 'offhours', category: 'day', title: '營業時間外提醒', summary: '公開版安全提醒',
        hint: '只提供概要；門鎖與保全細節另以訂位後操作說明傳送。', fields: ['name','date','start','end'],
        body: `{{name}}您好，您預約的{{date}} {{start}}–{{end}}包含綠豆蒜製研所營業時間外時段，我們會另外提供進出及離場操作說明。

請特別注意：一樓鐵門開啟時，必須有人留在一樓看顧；若所有人都在二樓，鐵門必須完全關閉。完整的鑰匙、門窗、電源及保全操作，會在訂位完成後個別提供。`
      },
      {
        id: 'overtime', category: 'day', title: '實際超時提醒', summary: '填寫實際超時分鐘',
        hint: '活動結束後發現逾時時使用。', fields: ['name','minutes'],
        body: `{{name}}您好，感謝您今天使用花盒二館 🤍

今天實際離場時間比原定租借時間超過約{{minutes}}分鐘。由於管理人員須在線等候客人完成離場及保全設定，未經確認而逾時會產生額外人力成本，將依規定以NT$450／時計費。

下次若活動時間可能延後，建議預約時多保留場佈、清潔及場地復原時間；若當日臨時需要延長，也請最晚在原定結束時間前2小時詢問，謝謝您的配合。`
      },
      {
        id: 'invoice', category: 'after', title: '發票資料收集', summary: '填寫後直接產生完整資料',
        hint: '也可只複製空白欄位，請客人自行回填。', fields: ['name','company','taxId','amount','address','recipient','phone'],
        body: `{{name}}您好，可以開立發票，請確認以下資料，我們會在使用完場地後寄出：

• 公司抬頭：{{company}}
• 統一編號：{{taxId}}
• 品名：場地費
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
        return `${year}/${Number(month)}/${Number(day)}`;
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

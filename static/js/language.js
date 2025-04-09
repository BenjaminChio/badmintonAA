// 語言資源文件
const languages = {
    'zh': {
        // 頁面標題
        'page_title': '羽毛球AA計算器',
        'language_selector': '語言',
        'language_zh': '中文',
        'language_en': '英文',
        
        // 標籤頁
        'basic_tab': '基本計算',
        'advanced_tab': '進階計算',
        
        // 基本計算表單
        'court_fee': '場地費 (元)',
        'shuttle_calculation': '球費計算',
        'shuttle_price_per_tube': '每筒球價格 (元)',
        'shuttles_used': '使用球數量 (個)',
        'calculation_result': '計算結果',
        'total_shuttle_fee': '總球費',
        'yuan': '元',
        'price_per_shuttle_note': '每個球價格 = 每筒價格 ÷ 12',
        'total_people': '總人數',
        'calculate_aa_fee': '計算AA費用',
        'reset': '一鍵重置',
        
        // 進階計算表單
        'female_discount_setting': '女生減免設定',
        'female_count': '女生人數',
        'discount_amount': '每人減免金額 (元)',
        
        // 計算結果
        'calculation_result_title': '計算結果',
        'court_fee_result': '場地費',
        'shuttle_fee_result': '球費',
        'total_fee_result': '總費用',
        'fee_per_person': '每人應付',
        'male_count': '男生人數',
        'female_count_result': '女生人數',
        'male_fee_per_person': '男生每人應付',
        'female_fee_per_person': '女生每人應付',
        'person': '人',
        'calculation_date': '計算日期：',
        
        // 匯出和分享
        'export_and_share': '匯出與分享',
        'export': '匯出',
        'export_to_excel': '匯出為Excel',
        'share': '分享',
        'share_to_wechat': '分享到微信',
        'share_to_wechat_group': '分享到微信群',
        
        // Excel匯出
        'basic_sheet_name': '羽毛球AA基本計算',
        'advanced_sheet_name': '羽毛球AA進階計算',
        'excel_title_basic': '羽毛球AA計算器 - 基本計算結果',
        'excel_title_advanced': '羽毛球AA計算器 - 進階計算結果',
        'excel_filename': '羽毛球AA計算結果',
        
        // 提示訊息
        'please_enter_court_fee': '請輸入場地費',
        'please_enter_valid_total_people': '請輸入有效的總人數',
        'female_count_exceed_error': '女生人數不能超過總人數',
        'calculate_first': '請先進行計算後再匯出',
        'wechat_share_message': '微信分享功能已觸發，由於瀏覽器限制，請使用微信掃描二維碼分享。',
        'wechat_group_share_message': '微信群分享功能已觸發，由於瀏覽器限制，請使用微信掃描二維碼分享到群。'
    },
    'en': {
        // Page title
        'page_title': 'Badminton AA Calculator',
        'language_selector': 'Language',
        'language_zh': 'Chinese',
        'language_en': 'English',
        
        // Tabs
        'basic_tab': 'Basic Calculation',
        'advanced_tab': 'Advanced Calculation',
        
        // Basic calculation form
        'court_fee': 'Court Fee (Yuan)',
        'shuttle_calculation': 'Shuttle Fee Calculation',
        'shuttle_price_per_tube': 'Price per Tube (Yuan)',
        'shuttles_used': 'Shuttles Used (pcs)',
        'calculation_result': 'Calculation Result',
        'total_shuttle_fee': 'Total Shuttle Fee',
        'yuan': 'Yuan',
        'price_per_shuttle_note': 'Price per shuttle = Price per tube ÷ 12',
        'total_people': 'Total People',
        'calculate_aa_fee': 'Calculate AA Fee',
        'reset': 'Reset',
        
        // Advanced calculation form
        'female_discount_setting': 'Female Discount Setting',
        'female_count': 'Female Count',
        'discount_amount': 'Discount Amount per Person (Yuan)',
        
        // Calculation results
        'calculation_result_title': 'Calculation Result',
        'court_fee_result': 'Court Fee',
        'shuttle_fee_result': 'Shuttle Fee',
        'total_fee_result': 'Total Fee',
        'fee_per_person': 'Fee per Person',
        'male_count': 'Male Count',
        'female_count_result': 'Female Count',
        'male_fee_per_person': 'Male Fee per Person',
        'female_fee_per_person': 'Female Fee per Person',
        'person': 'Person',
        'calculation_date': 'Calculation Date: ',
        
        // Export and share
        'export_and_share': 'Export and Share',
        'export': 'Export',
        'export_to_excel': 'Export to Excel',
        'share': 'Share',
        'share_to_wechat': 'Share to WeChat',
        'share_to_wechat_group': 'Share to WeChat Group',
        
        // Excel export
        'basic_sheet_name': 'Badminton AA Basic Calculation',
        'advanced_sheet_name': 'Badminton AA Advanced Calculation',
        'excel_title_basic': 'Badminton AA Calculator - Basic Calculation Result',
        'excel_title_advanced': 'Badminton AA Calculator - Advanced Calculation Result',
        'excel_filename': 'Badminton AA Calculation Result',
        
        // Alert messages
        'please_enter_court_fee': 'Please enter court fee',
        'please_enter_valid_total_people': 'Please enter valid total people',
        'female_count_exceed_error': 'Female count cannot exceed total people',
        'calculate_first': 'Please calculate first before exporting',
        'wechat_share_message': 'WeChat share function triggered. Due to browser limitations, please scan the QR code to share.',
        'wechat_group_share_message': 'WeChat group share function triggered. Due to browser limitations, please scan the QR code to share to group.'
    }
};

// 當前語言，預設為中文
let currentLanguage = 'zh';

// 獲取文本的函數
function getText(key) {
    return languages[currentLanguage][key] || key;
}

// 切換語言的函數
function switchLanguage(lang) {
    if (languages[lang]) {
        currentLanguage = lang;
        updateUILanguage();
    }
}

// 更新UI語言的函數
function updateUILanguage() {
    // 更新頁面標題
    document.title = getText('page_title');
    document.querySelector('h1').textContent = getText('page_title');
    
    // 更新標籤頁
    document.getElementById('basic-tab').textContent = getText('basic_tab');
    document.getElementById('advanced-tab').textContent = getText('advanced_tab');
    
    // 更新基本計算表單
    updateElementText('label[for="courtFee"]', 'court_fee');
    document.querySelector('#basic .card-header').textContent = getText('shuttle_calculation');
    updateElementText('label[for="shuttlePricePerTube"]', 'shuttle_price_per_tube');
    updateElementText('label[for="shuttlesUsed"]', 'shuttles_used');
    updateElementText('#basic .card-body .mb-3:nth-child(3) .form-label', 'calculation_result');
    document.querySelector('#basic .input-group-text:first-child').textContent = getText('total_shuttle_fee');
    document.querySelectorAll('#basic .input-group-text:last-child').forEach(el => el.textContent = getText('yuan'));
    document.querySelector('#basic .text-muted').textContent = getText('price_per_shuttle_note');
    updateElementText('label[for="totalPeople"]', 'total_people');
    document.getElementById('calculateBasic').textContent = getText('calculate_aa_fee');
    document.getElementById('resetBasic').textContent = getText('reset');
    
    // 更新進階計算表單
    updateElementText('label[for="advCourtFee"]', 'court_fee');
    document.querySelector('#advanced .card-header:first-child').textContent = getText('shuttle_calculation');
    updateElementText('label[for="advShuttlePricePerTube"]', 'shuttle_price_per_tube');
    updateElementText('label[for="advShuttlesUsed"]', 'shuttles_used');
    updateElementText('#advanced .card-body:first-child .mb-3:nth-child(3) .form-label', 'calculation_result');
    document.querySelector('#advanced .input-group-text:first-child').textContent = getText('total_shuttle_fee');
    document.querySelectorAll('#advanced .input-group-text:last-child').forEach(el => el.textContent = getText('yuan'));
    updateElementText('label[for="advTotalPeople"]', 'total_people');
    document.querySelector('#advanced .card-header:nth-child(1)').textContent = getText('female_discount_setting');
    updateElementText('label[for="femaleCount"]', 'female_count');
    updateElementText('label[for="discountAmount"]', 'discount_amount');
    document.getElementById('calculateAdvanced').textContent = getText('calculate_aa_fee');
    document.getElementById('resetAdvanced').textContent = getText('reset');
    
    // 更新計算結果
    document.querySelectorAll('h4').forEach(el => {
        if (el.textContent.includes('計算結果') || el.textContent.includes('Calculation Result')) {
            el.textContent = getText('calculation_result_title');
        } else if (el.textContent.includes('匯出與分享') || el.textContent.includes('Export and Share')) {
            el.textContent = getText('export_and_share');
        }
    });
    
    // 更新基本計算結果表格
    updateTableHeaders('#basicResult table');
    
    // 更新進階計算結果表格
    updateTableHeaders('#advancedResult table');
    
    // 更新匯出和分享按鈕
    document.querySelector('#exportDropdown').innerHTML = `<i class="bi bi-file-earmark-arrow-down"></i> ${getText('export')}`;
    document.querySelector('#exportExcel').textContent = getText('export_to_excel');
    document.querySelector('#shareDropdown').innerHTML = `<i class="bi bi-share"></i> ${getText('share')}`;
    document.querySelector('#shareWechat').textContent = getText('share_to_wechat');
    document.querySelector('#shareWechatGroup').textContent = getText('share_to_wechat_group');
    
    // 更新計算日期文本
    updateCalcDateText();
}

// 更新表格標題的輔助函數
function updateTableHeaders(tableSelector) {
    const table = document.querySelector(tableSelector);
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    for (let row of rows) {
        const th = row.querySelector('th');
        const lastCell = row.querySelector('td:last-child');
        
        if (th && th.textContent) {
            // 根據原始文本更新為對應的語言文本
            if (th.textContent.includes('場地費') || th.textContent.includes('Court Fee')) {
                th.textContent = getText('court_fee_result');
            } else if (th.textContent.includes('球費') || th.textContent.includes('Shuttle Fee')) {
                th.textContent = getText('shuttle_fee_result');
            } else if (th.textContent.includes('總費用') || th.textContent.includes('Total Fee')) {
                th.textContent = getText('total_fee_result');
            } else if (th.textContent.includes('每人應付') || th.textContent.includes('Fee per Person')) {
                th.textContent = getText('fee_per_person');
            } else if (th.textContent.includes('男生人數') || th.textContent.includes('Male Count')) {
                th.textContent = getText('male_count');
            } else if (th.textContent.includes('女生人數') || th.textContent.includes('Female Count')) {
                th.textContent = getText('female_count_result');
            } else if (th.textContent.includes('男生每人應付') || th.textContent.includes('Male Fee per Person')) {
                th.textContent = getText('male_fee_per_person');
            } else if (th.textContent.includes('女生每人應付') || th.textContent.includes('Female Fee per Person')) {
                th.textContent = getText('female_fee_per_person');
            }
        }
        
        // 更新單位文本（元或人）
        if (lastCell && lastCell.textContent) {
            if (lastCell.textContent === '元' || lastCell.textContent === 'Yuan') {
                lastCell.textContent = getText('yuan');
            } else if (lastCell.textContent === '人' || lastCell.textContent === 'Person') {
                lastCell.textContent = getText('person');
            }
        }
    }
}

// 更新計算日期文本的輔助函數
function updateCalcDateText() {
    const basicCalcDate = document.getElementById('basicCalcDate');
    const advancedCalcDate = document.getElementById('advancedCalcDate');
    
    if (basicCalcDate && basicCalcDate.textContent) {
        const dateStr = basicCalcDate.textContent.split('：')[1] || basicCalcDate.textContent.split(':')[1] || '';
        basicCalcDate.textContent = getText('calculation_date') + dateStr.trim();
    }
    
    if (advancedCalcDate && advancedCalcDate.textContent) {
        const dateStr = advancedCalcDate.textContent.split('：')[1] || advancedCalcDate.textContent.split(':')[1] || '';
        advancedCalcDate.textContent = getText('calculation_date') + dateStr.trim();
    }
}

// 更新元素文本的輔助函數
function updateElementText(selector, textKey) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = getText(textKey);
    }
}
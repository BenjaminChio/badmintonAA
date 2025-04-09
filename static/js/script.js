document.addEventListener('DOMContentLoaded', function() {
    // 初始化語言設置
    updateUILanguage();
    
    // 添加語言切換事件監聽器
    document.getElementById('languageSelector').addEventListener('change', function() {
        switchLanguage(this.value);
    });
    // 獲取基本計算表單元素
    const courtFeeInput = document.getElementById('courtFee');
    const shuttlePricePerTubeInput = document.getElementById('shuttlePricePerTube');
    const shuttlesUsedInput = document.getElementById('shuttlesUsed');
    const totalShuttleFeeInput = document.getElementById('totalShuttleFee');
    const totalPeopleInput = document.getElementById('totalPeople');
    const calculateBasicBtn = document.getElementById('calculateBasic');
    const resetBasicBtn = document.getElementById('resetBasic');
    const basicResultDiv = document.getElementById('basicResult');
    
    // 獲取進階計算表單元素
    const advCourtFeeInput = document.getElementById('advCourtFee');
    const advShuttlePricePerTubeInput = document.getElementById('advShuttlePricePerTube');
    const advShuttlesUsedInput = document.getElementById('advShuttlesUsed');
    const advTotalShuttleFeeInput = document.getElementById('advTotalShuttleFee');
    const advTotalPeopleInput = document.getElementById('advTotalPeople');
    const femaleCountInput = document.getElementById('femaleCount');
    const discountAmountInput = document.getElementById('discountAmount');
    const calculateAdvancedBtn = document.getElementById('calculateAdvanced');
    const resetAdvancedBtn = document.getElementById('resetAdvanced');
    const advancedResultDiv = document.getElementById('advancedResult');
    
    // 獲取匯出和分享按鈕
    const exportExcelBtn = document.getElementById('exportExcel');
    const shareWechatBtn = document.getElementById('shareWechat');
    const shareWechatGroupBtn = document.getElementById('shareWechatGroup');
    
    // 即時計算球費
    function calculateShuttleFee(pricePerTubeInput, shuttlesUsedInput, totalFeeInput) {
        const pricePerTube = parseFloat(pricePerTubeInput.value) || 0;
        const shuttlesUsed = parseInt(shuttlesUsedInput.value) || 0;
        
        // 每個球的價格 = 每筒價格 / 12
        const pricePerShuttle = pricePerTube / 12;
        const totalFee = pricePerShuttle * shuttlesUsed;
        
        totalFeeInput.value = totalFee.toFixed(2);
        return totalFee;
    }
    
    // 監聽基本計算的球費輸入變化
    shuttlePricePerTubeInput.addEventListener('input', function() {
        calculateShuttleFee(shuttlePricePerTubeInput, shuttlesUsedInput, totalShuttleFeeInput);
    });
    
    shuttlesUsedInput.addEventListener('input', function() {
        calculateShuttleFee(shuttlePricePerTubeInput, shuttlesUsedInput, totalShuttleFeeInput);
    });
    
    // 監聽進階計算的球費輸入變化
    advShuttlePricePerTubeInput.addEventListener('input', function() {
        calculateShuttleFee(advShuttlePricePerTubeInput, advShuttlesUsedInput, advTotalShuttleFeeInput);
    });
    
    advShuttlesUsedInput.addEventListener('input', function() {
        calculateShuttleFee(advShuttlePricePerTubeInput, advShuttlesUsedInput, advTotalShuttleFeeInput);
    });
    
    // 基本計算按鈕點擊事件
    calculateBasicBtn.addEventListener('click', function() {
        // 表單驗證
        if (!validateBasicForm()) {
            return;
        }
        
        // 獲取輸入值
        const courtFee = parseFloat(courtFeeInput.value) || 0;
        const shuttleFee = parseFloat(totalShuttleFeeInput.value) || 0;
        const totalPeople = parseInt(totalPeopleInput.value) || 0;
        
        // 準備發送到後端的數據
        const data = {
            courtFee: courtFee,
            shuttlePricePerTube: parseFloat(shuttlePricePerTubeInput.value) || 0,
            shuttlesUsed: parseInt(shuttlesUsedInput.value) || 0,
            totalPeople: totalPeople
        };
        
        // 發送到後端計算
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // 顯示結果
            document.getElementById('resultCourtFee').textContent = result.courtFee.toFixed(2);
            document.getElementById('resultShuttleFee').textContent = result.shuttleFee.toFixed(2);
            document.getElementById('resultTotalFee').textContent = result.totalFee.toFixed(2);
            document.getElementById('resultFeePerPerson').textContent = result.feePerPerson.toFixed(2);
            
            // 顯示當前日期
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            document.getElementById('basicCalcDate').textContent = '計算日期：' + dateStr;
            
            // 顯示結果區域
            basicResultDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('計算出錯:', error);
            alert('計算過程中出現錯誤，請重試。');
        });
    });
    
    // 進階計算按鈕點擊事件
    calculateAdvancedBtn.addEventListener('click', function() {
        // 表單驗證
        if (!validateAdvancedForm()) {
            return;
        }
        
        // 獲取輸入值
        const courtFee = parseFloat(advCourtFeeInput.value) || 0;
        const shuttleFee = parseFloat(advTotalShuttleFeeInput.value) || 0;
        const totalPeople = parseInt(advTotalPeopleInput.value) || 0;
        const femaleCount = parseInt(femaleCountInput.value) || 0;
        const discountAmount = parseFloat(discountAmountInput.value) || 0;
        
        // 準備發送到後端的數據
        const data = {
            courtFee: courtFee,
            shuttlePricePerTube: parseFloat(advShuttlePricePerTubeInput.value) || 0,
            shuttlesUsed: parseInt(advShuttlesUsedInput.value) || 0,
            totalPeople: totalPeople,
            femaleCount: femaleCount,
            discountAmount: discountAmount
        };
        
        // 發送到後端計算
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // 顯示結果
            document.getElementById('advResultCourtFee').textContent = result.courtFee.toFixed(2);
            document.getElementById('advResultShuttleFee').textContent = result.shuttleFee.toFixed(2);
            document.getElementById('advResultTotalFee').textContent = result.totalFee.toFixed(2);
            
            // 顯示男女分別費用
            if (result.maleCount !== undefined) {
                document.getElementById('resultMaleCount').textContent = result.maleCount;
                document.getElementById('resultFemaleCount').textContent = result.femaleCount;
                document.getElementById('resultMaleFeePerPerson').textContent = result.maleFeePerPerson.toFixed(2);
                document.getElementById('resultFemaleFeePerPerson').textContent = result.femaleFeePerPerson.toFixed(2);
            } else {
                // 如果沒有女生減免，顯示普通AA計算結果
                document.getElementById('resultMaleCount').textContent = totalPeople;
                document.getElementById('resultFemaleCount').textContent = '0';
                document.getElementById('resultMaleFeePerPerson').textContent = result.feePerPerson.toFixed(2);
                document.getElementById('resultFemaleFeePerPerson').textContent = '0.00';
            }
            
            // 顯示當前日期
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            document.getElementById('advancedCalcDate').textContent = '計算日期：' + dateStr;
            
            // 顯示結果區域
            advancedResultDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('計算出錯:', error);
            alert('計算過程中出現錯誤，請重試。');
        });
    });
    
    // 表單驗證函數 - 基本計算
    function validateBasicForm() {
        // 檢查場地費
        if (!courtFeeInput.value) {
            alert(getText('please_enter_court_fee'));
            courtFeeInput.focus();
            return false;
        }
        
        // 檢查總人數
        if (!totalPeopleInput.value || parseInt(totalPeopleInput.value) <= 0) {
            alert(getText('please_enter_valid_total_people'));
            totalPeopleInput.focus();
            return false;
        }
        
        return true;
    }
    
    // 表單驗證函數 - 進階計算
    function validateAdvancedForm() {
        // 檢查場地費
        if (!advCourtFeeInput.value) {
            alert(getText('please_enter_court_fee'));
            advCourtFeeInput.focus();
            return false;
        }
        
        // 檢查總人數
        if (!advTotalPeopleInput.value || parseInt(advTotalPeopleInput.value) <= 0) {
            alert(getText('please_enter_valid_total_people'));
            advTotalPeopleInput.focus();
            return false;
        }
        
        // 檢查女生人數不超過總人數
        const totalPeople = parseInt(advTotalPeopleInput.value);
        const femaleCount = parseInt(femaleCountInput.value) || 0;
        
        if (femaleCount > totalPeople) {
            alert(getText('female_count_exceed_error'));
            femaleCountInput.focus();
            return false;
        }
        
        return true;
    }
    
    // 重置基本計算表單
    resetBasicBtn.addEventListener('click', function() {
        document.getElementById('basicForm').reset();
        totalShuttleFeeInput.value = '';
        basicResultDiv.style.display = 'none';
    });
    
    // 重置進階計算表單
    resetAdvancedBtn.addEventListener('click', function() {
        document.getElementById('advancedForm').reset();
        advTotalShuttleFeeInput.value = '';
        advancedResultDiv.style.display = 'none';
    });
    
    // 匯出為Excel功能
    exportExcelBtn.addEventListener('click', function() {
        // 檢查是否有計算結果
        if (basicResultDiv.style.display === 'none' && advancedResultDiv.style.display === 'none') {
            alert(getText('calculate_first'));
            return;
        }
        
        // 創建工作簿
        const wb = XLSX.utils.book_new();
        
        // 準備數據
        let data = [];
        let sheetName = '';
        
        if (basicResultDiv.style.display !== 'none') {
            // 基本計算結果
            sheetName = getText('basic_sheet_name');
            data = [
                [getText('excel_title_basic')],
                [''],
                [getText('court_fee_result'), document.getElementById('resultCourtFee').textContent, getText('yuan')],
                [getText('shuttle_fee_result'), document.getElementById('resultShuttleFee').textContent, getText('yuan')],
                [getText('total_fee_result'), document.getElementById('resultTotalFee').textContent, getText('yuan')],
                [getText('fee_per_person'), document.getElementById('resultFeePerPerson').textContent, getText('yuan')]
            ];
        } else {
            // 進階計算結果
            sheetName = getText('advanced_sheet_name');
            data = [
                [getText('excel_title_advanced')],
                [''],
                [getText('court_fee_result'), document.getElementById('advResultCourtFee').textContent, getText('yuan')],
                [getText('shuttle_fee_result'), document.getElementById('advResultShuttleFee').textContent, getText('yuan')],
                [getText('total_fee_result'), document.getElementById('advResultTotalFee').textContent, getText('yuan')],
                [getText('male_count'), document.getElementById('resultMaleCount').textContent, getText('person')],
                [getText('female_count_result'), document.getElementById('resultFemaleCount').textContent, getText('person')],
                [getText('male_fee_per_person'), document.getElementById('resultMaleFeePerPerson').textContent, getText('yuan')],
                [getText('female_fee_per_person'), document.getElementById('resultFemaleFeePerPerson').textContent, getText('yuan')]
            ];
        }
        
        // 創建工作表
        const ws = XLSX.utils.aoa_to_sheet(data);
        
        // 添加工作表到工作簿
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        
        // 生成Excel文件並下載
        XLSX.writeFile(wb, `${getText('excel_filename')}.xlsx`);
    });
    
    // PDF匯出功能已移除
    
    // 分享到微信功能
    shareWechatBtn.addEventListener('click', function() {
        // 檢查是否有計算結果
        if (basicResultDiv.style.display === 'none' && advancedResultDiv.style.display === 'none') {
            alert(getText('calculate_first'));
            return;
        }
        
        alert(getText('wechat_share_message'));
        // 實際應用中，這裡需要調用微信分享API或生成分享二維碼
    });
    
    // 分享到微信群功能
    shareWechatGroupBtn.addEventListener('click', function() {
        // 檢查是否有計算結果
        if (basicResultDiv.style.display === 'none' && advancedResultDiv.style.display === 'none') {
            alert(getText('calculate_first'));
            return;
        }
        
        alert(getText('wechat_group_share_message'));
        // 實際應用中，這裡需要調用微信分享API或生成分享二維碼
    });
    
    // 表單驗證函數 - 進階計算
    function validateAdvancedForm() {
        // 檢查場地費
        if (!advCourtFeeInput.value) {
            alert(getText('please_enter_court_fee'));
            advCourtFeeInput.focus();
            return false;
        }
        
        // 檢查總人數
        if (!advTotalPeopleInput.value || parseInt(advTotalPeopleInput.value) <= 0) {
            alert(getText('please_enter_valid_total_people'));
            advTotalPeopleInput.focus();
            return false;
        }
        
        // 檢查女生人數不超過總人數
        const totalPeople = parseInt(advTotalPeopleInput.value);
        const femaleCount = parseInt(femaleCountInput.value) || 0;
        
        if (femaleCount > totalPeople) {
            alert(getText('female_count_exceed_error'));
            femaleCountInput.focus();
            return false;
        }
        
        return true;
    }
    
    // 同步基本和進階表單的數據
    document.getElementById('basic-tab').addEventListener('click', function() {
        // 從進階表單同步到基本表單
        if (advCourtFeeInput.value) courtFeeInput.value = advCourtFeeInput.value;
        if (advShuttlePricePerTubeInput.value) shuttlePricePerTubeInput.value = advShuttlePricePerTubeInput.value;
        if (advShuttlesUsedInput.value) shuttlesUsedInput.value = advShuttlesUsedInput.value;
        if (advTotalPeopleInput.value) totalPeopleInput.value = advTotalPeopleInput.value;
        
        // 更新球費計算
        calculateShuttleFee(shuttlePricePerTubeInput, shuttlesUsedInput, totalShuttleFeeInput);
    });
    
    document.getElementById('advanced-tab').addEventListener('click', function() {
        // 從基本表單同步到進階表單
        if (courtFeeInput.value) advCourtFeeInput.value = courtFeeInput.value;
        if (shuttlePricePerTubeInput.value) advShuttlePricePerTubeInput.value = shuttlePricePerTubeInput.value;
        if (shuttlesUsedInput.value) advShuttlesUsedInput.value = shuttlesUsedInput.value;
        if (totalPeopleInput.value) advTotalPeopleInput.value = totalPeopleInput.value;
        
        // 更新球費計算
        calculateShuttleFee(advShuttlePricePerTubeInput, advShuttlesUsedInput, advTotalShuttleFeeInput);
    });
});
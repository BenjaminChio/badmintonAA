import os
from flask import Flask, render_template, request, jsonify
from config import config

def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    return app

app = create_app()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    
    # 獲取基本數據
    court_fee = float(data.get('courtFee', 0))
    shuttle_price_per_tube = float(data.get('shuttlePricePerTube', 0))
    shuttles_used = int(data.get('shuttlesUsed', 0))
    total_people = int(data.get('totalPeople', 0))
    
    # 計算球費
    shuttle_unit_price = shuttle_price_per_tube / 12  # 每筒12個球
    total_shuttle_fee = shuttle_unit_price * shuttles_used
    
    # 計算總費用
    total_fee = court_fee + total_shuttle_fee
    
    # 基本AA計算
    fee_per_person = total_fee / total_people if total_people > 0 else 0
    
    result = {
        'courtFee': court_fee,
        'shuttleFee': total_shuttle_fee,
        'totalFee': total_fee,
        'feePerPerson': round(fee_per_person, 2)
    }
    
    # 進階計算 (女生減免)
    female_count = int(data.get('femaleCount', 0))
    discount_amount = float(data.get('discountAmount', 0))
    
    if female_count > 0 and discount_amount > 0 and female_count < total_people:
        male_count = total_people - female_count
        
        # 計算男生和女生的費用
        # 男生費用 = 總人數總費用​ + 男生人數/女生人數 × 少付金額
        # 女生費用 = 總人數總費用​ - 少付金額
        
        total_discount = female_count * discount_amount
        male_fee_per_person = (total_fee + total_discount) / total_people
        female_fee_per_person = male_fee_per_person - discount_amount
        
        result.update({
            'maleCount': male_count,
            'femaleCount': female_count,
            'maleFeePerPerson': round(male_fee_per_person, 2),
            'femaleFeePerPerson': round(female_fee_per_person, 2)
        })
    
    return jsonify(result)

if __name__ == '__main__':
    # 開發環境使用debug=True，生產環境應設為False
    app.run(host='0.0.0.0', port=5000, debug=True)

# 為WSGI應用提供入口點
def get_app():
    return app
console.log('script loaded...')

// Block with inputs contains data attribute data-cache
const parent = document.querySelectorAll('[data-cache]');

// Load cache then window load
document.addEventListener('DOMContentLoaded', function () {
    // Загружаем их, распаковывая сохранённый массив.
    const db = JSON.parse(localStorage.getItem('db'));
    parent.forEach(item => {
        for (key in db) {
            if (item.id === key) {
                item.value = db[key].value;
            }
        }
    });
});

// Create cache from inputs then inputs keyup
const cache = {};
$("[data-cache]").on("keyup change", function (e) {
    const db = JSON.parse(localStorage.getItem('db'));

    if (db === null) {
        cache[e.target.id] = { value: e.target.value };
        localStorage.setItem('db', JSON.stringify(cache));
    }
    if (db !== null) {
        db[e.target.id] = { value: e.target.value };
        localStorage.setItem('db', JSON.stringify(db));
    }
});


// Initialize toast
const toast = document.getElementById('toast');
function toastConstructor(toast, params) {
    toast.innerHTML = '';
    toast.classList = '';
    if (params.text === undefined) {
        params.text = '';
    } else {
        const body = document.createElement('div');
        if (params.type === 'success') {
            toast.classList = "toast bg-success text-light";
            body.classList = ('toast-body');
            body.innerText = params.text;
        }
        else if (params.type === 'error') {
            toast.classList = "toast bg-danger text-light";
            body.classList = ('toast-body');
            body.innerText = params.text;
        }
        else {
            toast.classList = "toast bg-primary text-light";
            body.classList = ('toast-body');
            body.innerText = params.text;
        }
        toast.appendChild(body);
    }
};

function сountGenplan() {
    const k3 = +document.getElementById('k3').value;
    const k4 = +document.getElementById('k4').value;
    const type = document.getElementById('typeOfSettlement').value;
    const populationEstimate = +document.getElementById('populationEstimate').value;
    const kilkistNaselenya = +(populationEstimate / 1000).toFixed(6);
    const nPunkt = document.getElementById('nameOfSettlement').value;
    const vEkologia = document.getElementById('сostForStrategicReport').value;
    const dEkspertiza = document.getElementById('costOfExamination').value;
    const kZemlevporyad = document.getElementById('developmentLandManagement').value;
    const kZonuvanya = document.getElementById('developmentZoningPlan').value;
    const kITR = document.getElementById('engineeringAndTechnicalMeasures').value;
    function aoa(x) {
        if (x.a === undefined || x.b === undefined || k3 === undefined || kilkistNaselenya === undefined
            || k4 === undefined) return "не задані аргументи";
        let res1 = (x.a + x.b * kilkistNaselenya) * k3 * k4;
        let res2 = (Number(res1) * Number(kZemlevporyad)).toFixed(2);
        let res3 = (Number(res1) * Number(kZonuvanya)).toFixed(2);
        let razom1 = (Number(res1) + Number(res2) + Number(res3)).toFixed(2);
        let res4 = (Number(razom1) * Number(kITR)).toFixed(2);

        let res5 = (Number(razom1) + Number(res4) + Number(vEkologia)).toFixed(2);
        let res6 = ((Number(razom1) + Number(res4) + Number(vEkologia)) * Number(kITR)).toFixed(2);
        let res7 = (Number(res5) + Number(res6)).toFixed(2);

        let vartistEspertiza = (dEkspertiza * 1497).toFixed(2);
        let res8 = (Number(razom1) + Number(res4) + Number(vEkologia) + Number(vartistEspertiza)).toFixed(2);
        let res9 = ((Number(razom1) + Number(res4) + Number(vEkologia) + Number(vartistEspertiza)) * Number(kITR)).toFixed(2);
        let res10 = (Number(res8) + Number(res9)).toFixed(2);



        let arr = [
            {
                "id": 1,
                "characteristic": `Генеральний план \n${nPunkt}\nРозрахунковий показник – населення ${kilkistNaselenya} чол.`,
                "nameOfTheDocument": `Р.40 . Збірник цін на проектні роботи для будівництва. Районне планування. Планування і забудова населених пунктів.\nтабл. 40 – 20. п.1. \nДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)\nK3=${k3}-табл. Ж.1;\nK4=${k4}- табл. Ж.З; п.2.`,
                "costCalculation": `(${x.a} + ${x.b} × ${kilkistNaselenya}) × ${k3} × ${k4}`.replace(/\./gm, ","),
                "price": `${Number(res1).toFixed(2)}`.replace(/\./gm, ",")
            },
            {
                "id": 2,
                "characteristic": 'Розроблення землевпорядної частини',
                "nameOfTheDocument": 'ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)',
                "costCalculation": `${Number(res1).toFixed(2)} × ${Number(kZemlevporyad).toFixed(2)}`.replace(/\./gm, ","),
                "price": `${Number(res2).toFixed(2)}`.replace(/\./gm, ",")
            },
            {
                "id": 3,
                "characteristic": 'Розроблення Плану зонування території',
                "nameOfTheDocument": 'ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)',
                "costCalculation": `${Number(res1).toFixed(2)} × ${Number(kZonuvanya).toFixed(2)}`.replace(/\./gm, ","),
                "price": `${Number(res3).toFixed(2)}`.replace(/\./gm, ","),
            },
            {
                "id": 4,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Разом',
                "price": `${razom1}`.replace(/\./gm, ",")
            },
            {
                "id": 5,
                "characteristic": 'Інженерно-технічні заходи цивільного захисту (цивільної оборони)на мирний час та особливий період',
                "nameOfTheDocument": 'ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)',
                "costCalculation": `${Number(razom1).toFixed(2)} × ${Number(kITR).toFixed(2)}`.replace(/\./gm, ","),
                "price": Number(res4).toFixed(2).replace(/\./gm, ",")
            },
            {
                "id": 6,
                "characteristic": 'Звіт про стратегічну екологічну оцінку',
                "nameOfTheDocument": '',
                "costCalculation": '',
                "price": `${vEkologia}`.replace(/\./gm, ",")
            },
            {
                "id": 7,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Разом, без ПДВ',
                "price": `${Number(res5).toFixed(2).replace(/\./gm, ",")}`
            },
            {
                "id": 8,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": '20% ПДВ',
                "price": `${Number(res6).toFixed(2).replace(/\./gm, ",")}`
            },
            {
                "id": 9,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Всього з урахуванням ПДВ',
                "price": `${Number(res7).toFixed(2).replace(/\./gm, ",")}`
            }
        ];

        // Если город добавляем експертизу
        if (type == "місто") {
            let s = arr.slice(0, 7);
            s.push(
                {
                    "id": 1,
                    "characteristic": '',
                    "nameOfTheDocument": '',
                    "costCalculation": 'Разом',
                    "price": `${(Number(res5)).toFixed(2).replace(/\./gm, ",")}`
                },
                {
                    "id": 2,
                    "characteristic": `Вартість експертизи`,
                    "nameOfTheDocument": `П.КМУ від 25 травня 2011 р. N 548. Із змінами. ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3) табл. Ж.З; п.2.`,
                    "costCalculation": `${dEkspertiza} днів × 1497 грн.`,
                    "price": `${Number(vartistEspertiza).toFixed(2).replace(/\./gm, ",")}`
                },
                {
                    "id": 7,
                    "characteristic": '',
                    "nameOfTheDocument": '',
                    "costCalculation": 'Разом, без ПДВ',
                    "price": `${Number(res8).toFixed(2).replace(/\./gm, ",")}`
                },
                {
                    "id": 8,
                    "characteristic": '',
                    "nameOfTheDocument": '',
                    "costCalculation": '20% ПДВ',
                    "price": `${Number(res9).toFixed(2).replace(/\./gm, ",")}`
                },
                {
                    "id": 9,
                    "characteristic": '',
                    "nameOfTheDocument": '',
                    "costCalculation": 'Всього з урахуванням ПДВ',
                    "price": `${Number(res10).toFixed(2).replace(/\./gm, ",")}`
                }
            )
            arr = s;
        }
        arr.forEach((el, index) => { // Нумерация массива
            if (index > 0) el[0] = index;
        })
        return arr;
    }

    if (type == "село") {
        if (kilkistNaselenya <= 0.5) {
            let x = { a: 725, b: 2353 };
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 0.5 && kilkistNaselenya <= 1.0) {
            let x = { a: 930, b: 1953 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 1.0 && kilkistNaselenya <= 2.0) {
            let x = { a: 1628, b: 1256 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 2.0 && kilkistNaselenya <= 5.0) {
            let x = { a: 3562, b: 288 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 5.0 && kilkistNaselenya <= 10.0) {
            let x = { a: 3850, b: 233 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 10.0) {
            toastConstructor(toast, { type: 'error', text: `🤷‍♂️ Забагато народу ${kilkistNaselenya.toFixed(2)} тис. чол., мабуть це вже смт або місто, обери тип "місто" або "смт"` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast

        }
    }
    if (type == "місто" || type == "смт") {
        if (kilkistNaselenya <= 1.0) {
            let x = { a: 3080, b: 500 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 1.0 && kilkistNaselenya <= 2.0) {
            let x = { a: 3180, b: 400 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 2.0 && kilkistNaselenya <= 5.0) {
            let x = { a: 3236, b: 372 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 5.0 && kilkistNaselenya <= 10.0) {
            let x = { a: 3608, b: 298 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 10.0 && kilkistNaselenya <= 25.0) {
            let x = { a: 3769, b: 282 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 25.0 && kilkistNaselenya <= 50) {
            let x = { a: 7436, b: 135 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 50.0 && kilkistNaselenya <= 100.0) {
            let x = { a: 11858, b: 118.7 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 250.0 && kilkistNaselenya <= 500.0) {
            let x = { a: 22918, b: 64.64 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 500.0 && kilkistNaselenya <= 750.0) {
            let x = { a: 23929, b: 47.52 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 750.0 && kilkistNaselenya <= 1000.0) {
            let x = { a: 24403, b: 46.9 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 1000.0 && kilkistNaselenya <= 1500.0) {
            let x = { a: 39213, b: 32.09 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 1500.0 && kilkistNaselenya <= 2500.0) {
            let x = { a: 49381, b: 25.31 }
            toastConstructor(toast, { type: 'success', text: `🎉 Порахував генплан ${nPunkt}` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return aoa(x);
        }
        if (kilkistNaselenya > 2500.0) {
            toastConstructor(toast, { type: 'error', text: `🤷‍♂️ Забагато народу ${kilkistNaselenya.toFixed(2)} тис. чол., я вмію рахувати тільки до 2500 тис. чол.` }); // Setup toast
            new bootstrap.Toast(toast).show(); // Show toast
            return
        }
    }
}

function сountComplan() {
    const k3 = +document.getElementById('k3').value;
    const k4 = +document.getElementById('k4').value;
    const type = document.getElementById('typeOfSettlement').value;
    const nPunkt = document.getElementById('nameOfSettlement').value;
    const vEkologia = document.getElementById('сostForStrategicReport').value;
    const dEkspertiza = document.getElementById('costOfExamination').value;
    const ploshaPlan = +(document.getElementById('areaForComprehensivePlan').value / 1000).toFixed(6);
    const kZemlevporyad = document.getElementById('developmentLandManagement').value;
    const kZonuvanya = document.getElementById('developmentZoningPlan').value;
    const kITR = document.getElementById('engineeringAndTechnicalMeasures').value;

    const aoa = function (x) {
        if (x.a === undefined || x.b === undefined || k3 === undefined || ploshaPlan === undefined
            || k4 === undefined) return "не задані аргументи";
        let res1 = (x.a + x.b * ploshaPlan) * k3 * k4;
        let res2 = (Number(res1) * Number(kZemlevporyad)).toFixed(2);
        let res3 = (Number(res1) * Number(kZonuvanya)).toFixed(2);
        let razom1 = (Number(res1) + Number(res2) + Number(res3)).toFixed(2);
        let res4 = (Number(razom1) * Number(kITR)).toFixed(2);
        let res5 = (Number(dEkspertiza) * 1497).toFixed(2);
        let razom2 = (Number(razom1) + Number(res4) + Number(vEkologia)).toFixed(2);
        let razom3 = (Number(razom2) + Number(res5)).toFixed(2);
        let razom4 = (Number(razom3) * Number(kITR)).toFixed(2);
        let razom5 = (Number(razom3) + Number(razom4)).toFixed(2);


        let arr = [
            {
                "id": 1,
                "characteristic": `Комплексний план \n${nPunkt}\nРозрахунковий показник – площа ${ploshaPlan} км2`,
                "nameOfTheDocument": `Р.40 . Збірник цін на проектні роботи для будівництва. Районне планування. Планування і забудова населених пунктів.\nтабл. 40 – 20. п.1. \nДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)\nK3=${k3}-табл. Ж.1;\nK4=${k4}- табл. Ж.З; п.2.`,
                "costCalculation": `(${x.a} + ${x.b} × ${ploshaPlan}) × ${k3} × ${k4}`.replace(/\./gm, ","),
                "price": `${Number(res1).toFixed(2)}`.replace(/\./gm, ",")
            },
            {
                "id": 2,
                "characteristic": 'Розроблення землевпорядної частини',
                "nameOfTheDocument": 'ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)',
                "costCalculation": `${Number(res1).toFixed(2)} × ${Number(kZemlevporyad).toFixed(2)}`.replace(/\./gm, ","),
                "price": `${Number(res2).toFixed(2)}`.replace(/\./gm, ",")
            },
            {
                "id": 3,
                "characteristic": 'Розроблення Плану зонування території',
                "nameOfTheDocument": 'ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)',
                "costCalculation": `${Number(res1).toFixed(2)} × ${Number(kZonuvanya).toFixed(2)}`.replace(/\./gm, ","),
                "price": `${Number(res3).toFixed(2)}`.replace(/\./gm, ","),
            },
            {
                "id": 4,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Разом',
                "price": `${Number(razom1).toFixed(2)}`.replace(/\./gm, ",")
            },
            {
                "id": 5,
                "characteristic": 'Інженерно-технічні заходи цивільного захисту (цивільної оборони)на мирний час та особливий період',
                "nameOfTheDocument": 'ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3)',
                "costCalculation": `${Number(razom1).toFixed(2)} × ${Number(kITR).toFixed(2)}`.replace(/\./gm, ","),
                "price": Number(res4).toFixed(2).replace(/\./gm, ",")
            },
            {
                "id": 6,
                "characteristic": 'Звіт про стратегічну екологічну оцінку',
                "nameOfTheDocument": '',
                "costCalculation": '',
                "price": `${vEkologia}`.replace(/\./gm, ",")
            },
            {
                "id": 7,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Разом',
                "price": `${(Number(razom2)).toFixed(2).replace(/\./gm, ",")}`
            },
            {
                "id": 8,
                "characteristic": `Вартість експертизи`,
                "nameOfTheDocument": `П.КМУ від 25 травня 2011 р. N 548. Із змінами. ДСТУ Б Д.1.1-7:2013 (зміна 1,2,3) табл. Ж.З; п.2.`,
                "costCalculation": `${dEkspertiza} днів × 1497 грн.`,
                "price": `${Number(res5).toFixed(2).replace(/\./gm, ",")}`
            },
            {
                "id": 9,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Разом, без ПДВ',
                "price": `${Number(razom3).toFixed(2).replace(/\./gm, ",")}`
            },
            {
                "id": 10,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": '20% ПДВ',
                "price": `${Number(razom4).toFixed(2).replace(/\./gm, ",")}`
            },
            {
                "id": 11,
                "characteristic": '',
                "nameOfTheDocument": '',
                "costCalculation": 'Всього з урахуванням ПДВ',
                "price": `${Number(razom5).toFixed(2).replace(/\./gm, ",")}`
            }
        ];

        arr.forEach((el, index) => { // Нумерация массива
            if (index > 0) el[0] = index;
        })
        return arr;
    }

    if (type == "село" || type == "місто" || type == "смт") {
        let x = { a: 53056, b: 627.8 };

        toastConstructor(toast, { type: 'success', text: `🎉 Порахував комплан для ${nPunkt}` }); // Setup toast
        new bootstrap.Toast(toast).show(); // Show toast
        return aoa(x);
    }

}

document.getElementById('сalculate').addEventListener('click', (e) => {
    let jsonForTable;
    const type = document.getElementById('calculationType').value;


    if (type === 'комплан') {
        jsonForTable = сountComplan();
    }
    if (type === 'генплан') {
        jsonForTable = сountGenplan();
    }
    $(function () {
        $('#table').bootstrapTable('destroy');
        $('#table').bootstrapTable({
            data: jsonForTable
        });
    });
});

document.getElementById('clear').addEventListener('click', (e) => {
    const db = JSON.parse(localStorage.getItem('db'));
    parent.forEach(item => {
        for (key in db) {
            if (item.id === key) {
                item.value = '';
            }
        }
    });
    localStorage.clear();
});
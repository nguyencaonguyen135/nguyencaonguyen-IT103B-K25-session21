let students = [  
    { id: 1734567890, name: "Nguyễn Văn A", age: 20, class: "CNTT-12" },  
    { id: 1734567891, name: "Trần Thị B", age: 21, class: "KTPM-11" },  
    { id: 1734567892, name: "Lê Văn C", age: 19, class: "CNTT-12" },  
    { id: 1734567893, name: "Phạm Thị D", age: 22, class: "MKT-10" },  
    { id: 1734567894, name: "Hoàng Văn E", age: 20, class: "CNTT-11" }
];

const getStudents = () => JSON.parse(localStorage.getItem("listStudents")) || students;

const saveStudents = (data) => {
    localStorage.setItem("listStudents", JSON.stringify(data));
};

let tbodyStudents = document.getElementById("tbody");
let btnAdd = document.getElementById("btn-add");

const renderStudents = () => {
    const dataStudents = getStudents();
    tbodyStudents.innerHTML = "";

    dataStudents.forEach((student) => {
        let itemElement = document.createElement("tr");
        itemElement.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.class}</td>
            <td>
                <button onclick="editStudent(${student.id})">Sửa</button>
            </td>
        `;
        tbodyStudents.appendChild(itemElement);
    });
};

renderStudents();


const addStudent = () => {
    const dataStudents = getStudents();

    const studentName = document.getElementById("studentName").value.trim();
    const studentAge = document.getElementById("studentAge").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();

    if (!studentName || !studentAge || !studentClass) {
        alert("Nhập đủ thông tin!");
        return;
    }

    const newStudent = {
        id: Date.now(),
        name: studentName,
        age: +studentAge,
        class: studentClass
    };

    dataStudents.push(newStudent);
    saveStudents(dataStudents);
    renderStudents();

    document.getElementById("studentName").value = "";
    document.getElementById("studentAge").value = "";
    document.getElementById("studentClass").value = "";
};

let editingId = null;

const editStudent = (id) => {
    const dataStudents = getStudents();
    const student = dataStudents.find(s => s.id === id);

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentAge").value = student.age;
    document.getElementById("studentClass").value = student.class;

    editingId = id;

    btnAdd.textContent = "Cập nhật";
};

const updateStudent = () => {
    let dataStudents = getStudents();

    const studentName = document.getElementById("studentName").value.trim();
    const studentAge = document.getElementById("studentAge").value.trim();
    const studentClass = document.getElementById("studentClass").value.trim();

    dataStudents = dataStudents.map(student => {
        if (student.id === editingId) {
            return {
                ...student,
                name: studentName,
                age: +studentAge,
                class: studentClass
            };
        }
        return student;
    });

    saveStudents(dataStudents);
    renderStudents();

    editingId = null;
    btnAdd.textContent = "Thêm sinh viên";

    document.getElementById("studentName").value = "";
    document.getElementById("studentAge").value = "";
    document.getElementById("studentClass").value = "";
};

btnAdd.addEventListener("click", (e) => {
    e.preventDefault();

    if (editingId) {
        updateStudent(); // đang sửa
    } else {
        addStudent(); // đang thêm
    }
});
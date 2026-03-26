let students = [  
{ id: 1, name: "Nguyễn Văn A",   age: 20, class: "CNTT-12" },  
{ id: 2, name: "Trần Thị B",     age: 21, class: "KTPM-11" },  
{ id: 3, name: "Lê Văn C",       age: 19, class: "CNTT-12" },  
{ id: 4, name: "Phạm Thị D",     age: 22, class: "MKT-10"  },  
{ id: 5, name: "Hoàng Văn E",    age: 20, class: "CNTT-11" }];

let ulStudent = document.getElementById("studentList");

const renderData = () => {
    ulStudent.innerHTML = "";

    students.forEach((student) => {
        let itemElement = document.createElement("li");
        itemElement.innerHTML = `
            <li>${student.id}. ${student.name} (${student.age} tuổi - lớp ${student.class})</li>
        `;
        ulStudent.appendChild(itemElement);
    });
    localStorage.setItem("Students", JSON.stringify(students));
};

renderData();
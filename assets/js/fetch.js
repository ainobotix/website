// Your Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDE-Mokjha0UJc6GW-mVz02dGbmaO6-xn8",
        authDomain: "ainobotix-152ee.firebaseapp.com",
        databaseURL: "https://ainobotix-152ee-default-rtdb.firebaseio.com",
        projectId: "ainobotix-152ee",
        storageBucket: "ainobotix-152ee.appspot.com",
        messagingSenderId: "298959337678",
        appId: "1:298959337678:web:ef12d8d577d3f6b255789f",
        measurementId: "G-804FG7EN8J"
      };
  
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      const database = firebase.database();
  
      // Fetch data from Firebase
      const dataRef = database.ref('registration');
      dataRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const tbody = document.getElementById('data-table-body');
        tbody.innerHTML = '';
        let serialNumber = 1;
  
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${serialNumber++}</td>
              <td>${data[key].name}</td>
              <td>${data[key].email}</td>
              <td>${data[key].class}</td>
              <td>${data[key].Parents_phone}</td>
              <td>${data[key].Whatsapp_phone}</td>
              <td>${data[key].message}</td>
              <td>${data[key].timestamp}</td>
            `;
            tbody.appendChild(row);
          }
        }
      });

      const dataRef1 = database.ref('contactus');
      dataRef1.on('value', (snapshot) => {
        const data = snapshot.val();
        const tbody = document.getElementById('contact-table');
        tbody.innerHTML = '';
        let serialNumber = 1;
  
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${serialNumber++}</td>
              <td>${data[key].name}</td>
              <td>${data[key].email}</td>
              <td>${data[key].phone}</td>
              <td>${data[key].message}</td>
              <td>${data[key].timestamp}</td>
            `;
            tbody.appendChild(row);
          }
        }
      });

      // Function to clear data from database
      function clearData(nodePath) {
        const dataRef = database.ref(nodePath);
        dataRef.set(null)
          .then(() => {
            document.getElementById('alert-status').textContent = `Data at ${nodePath} Database has been cleared.`;
          })
          .catch((error) => {
            document.getElementById('alert-status').textContent = `Failed to clear data at ${nodePath} Database: ${error.message}`;
          });
      }

      document.getElementById('clear-data-reg').addEventListener('click', () => {
        clearData('registration');
      });

      const toastTrigger1 = document.getElementById('clear-data-reg')
      const toastLiveExample = document.getElementById('liveToast')

      if (toastTrigger1) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger1.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }

      document.getElementById('clear-data-con').addEventListener('click', () => {
        clearData('contactus');
      });

      const toastTrigger2 = document.getElementById('clear-data-con')

      if (toastTrigger2) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger2.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }

      document.getElementById('export-excel1').addEventListener('click', () => {
        var table2excel = new Table2Excel();
        table2excel.export(document.querySelectorAll("#download-table1"),'Registered Students');
      });

      document.getElementById('export-excel2').addEventListener('click', () => {
        var table2excel = new Table2Excel();
        table2excel.export(document.querySelectorAll("#download-table2"),'Contact Enquiry');
      });

      document.addEventListener("DOMContentLoaded", function() {
        const buttons = document.querySelectorAll('.toggleButton');
    
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
    
                // Hide all content elements
                const contents = document.querySelectorAll('.content');
                contents.forEach(content => {
                    content.style.display = "none";
                });
    
                // Show the targeted element
                targetElement.style.display = "block";
            });
        });
    
        // Initially hide all content elements
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            content.style.display = "none";
        });
    });
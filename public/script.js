
        var socket = io();
        var messages = document.getElementById('messages');
        var form = document.getElementById('form');
        var passwordform = document.getElementById('setPassword');
        var input = document.getElementById('input');
        var input_username = document.getElementById('inputpassword');
        var current_username ="";
        var current_room = '';


        //Function to create socket io room
        function joinRoom(arg){
          document.getElementById("chooseRoom").style.display = "none";
          current_room = arg;
          socket.emit('create', current_room);
          console.log('join room '+current_room);

        }

        form.addEventListener('submit', function(e) {
          e.preventDefault();
          if (input.value) {
            socket.emit('chat message', input.value, current_username);
            input.value = '';
          }
        });

        passwordform.addEventListener('submit', function(e) {
          e.preventDefault();
          console.log("username envoyé");
          if (input_username.value && current_username != input_username.value) {
            current_username = input_username.value;
            socket.emit('username', input_username.value);
          }
        });

        socket.on('chat message', function(msg) {
          var item = document.createElement('p');
          item.textContent = msg;
          //add class to item
          item.className = "message";
          messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
        });
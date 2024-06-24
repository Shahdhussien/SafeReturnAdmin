const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})




const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})




document.addEventListener('DOMContentLoaded', function() {
	var editButtons = document.querySelectorAll('.edit-button');
	var deleteButtons = document.querySelectorAll('.delete-button');
	var editModal = document.getElementById('editModal');
	var deleteModal = document.getElementById('deleteModal');
	var closeEditButton = document.querySelector('#editModal .close');
	var closeDeleteButton = document.querySelector('#deleteModal .close');
  
	editButtons.forEach(function(editButton) {
	  editButton.addEventListener('click', function(event) {
		event.preventDefault();
		editModal.style.display = 'block';
	  });
	});
  
	deleteButtons.forEach(function(deleteButton) {
	  deleteButton.addEventListener('click', function(event) {
		event.preventDefault();
		deleteModal.style.display = 'block';
	  });
	});
  
	closeEditButton.addEventListener('click', function() {
	  editModal.style.display = 'none';
	});
  
	closeDeleteButton.addEventListener('click', function() {
	  deleteModal.style.display = 'none';
	});
  
	var editForm = document.querySelector('#editModal form');
	editForm.addEventListener('submit', function(event) {
	  event.preventDefault();
	  // Perform edit operation here
	  editModal.style.display = 'none';
	});
  
	var deleteForm = document.querySelector('#deleteModal form');
	deleteForm.addEventListener('submit', function(event) {
	  event.preventDefault();



	  
	  // Perform delete operation here
	  deleteModal.style.display = 'none';
	});
  });





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
////////////Notifications////////////////
var socket = io("https://safereturn.onrender.com");
document.addEventListener('DOMContentLoaded', () => {
	const notificationCount = document.getElementById('notificationCount');
	
	socket.emit('requestNotificationCount'); // Request the initial notification count when the page loads

  socket.on('notificationCount', (count) => {
    notificationCount.textContent = count;
  });
})





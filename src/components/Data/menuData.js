// menuData.js
import {
  homeOutline,
  informationCircleOutline,
  heartOutline,
  personOutline,
  chatbubbleOutline,
  addCircleOutline,
  gridOutline
} from 'ionicons/icons';

export const sidebarMenus = [
  { path: '/user/dashboard', label: 'Dashboard', icon: gridOutline },
  { path: '/home', label: 'Home', icon: homeOutline },
  { path: '/favorites', label: 'Favorites', icon: heartOutline },
  { path: '/chat', label: 'Messages', icon: chatbubbleOutline },
  { path: '/create-listing', label: 'Sell Item', icon: addCircleOutline },
  { path: '/about', label: 'About', icon: informationCircleOutline },
  { path: '/profile', label: 'Profile', icon: personOutline }
];
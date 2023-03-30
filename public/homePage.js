const logoutB = new LogoutButton;
logoutB.action = () => {
ApiConnector.logout((cb) => {
    if (cb.success) {
        location.reload();
    } 
  });
}
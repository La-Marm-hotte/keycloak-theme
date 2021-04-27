const rawMembershipDate = document.querySelector('input#rawMembershipDate').value;
const date = Date.parse(rawMembershipDate);
document.querySelector('input#membershipDate').value = Intl.DateTimeFormat().format(date);

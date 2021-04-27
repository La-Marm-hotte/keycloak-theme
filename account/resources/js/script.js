function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function ldapDate(rawDate) {
    const parsed = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})Z/.exec(rawDate);
    const month = parseInt(parsed[2], 10) - 1;
    return new Date(Date.UTC(parsed[1], month, parsed[3], parsed[4], parsed[5]));
}

docReady(function() {
    const rawMembershipDate = document.querySelector('input#rawMembershipDate').value;
    const date = ldapDate(rawMembershipDate);
    document.querySelector('input#membershipDate').value = Intl.DateTimeFormat().format(date);
});


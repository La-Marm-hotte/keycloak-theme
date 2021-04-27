function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

docReady(function() {
    const rawMembershipDate = document.querySelector('input#rawMembershipDate').value;
    const date = Date.parse(rawMembershipDate);
    document.querySelector('input#membershipDate').value = Intl.DateTimeFormat().format(date);
});


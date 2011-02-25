/* Author: 

*/

$(document).ready(function() {
    var computerInstallationTime = 1.5,
        computerMaintenanceTime = 20.0,
        computerAnnualizedPrice = 400 * 12,
        weekdaysPerYear = 52 * 5,
        adminSalary = 75000;

    var $scriptCount = $("#script-count"),
        $browserCount = $("#browser-count"),
        $scriptLength = $("#script-length"),
        $goalTime = $("#goal-time"),
        $scriptCountDisplay = $("#script-count-display"),
        $browserCountDisplay = $("#browser-count-display"),
        $scriptLengthDisplay = $("#script-length-display"),
        $goalTimeDisplay = $("#goal-time-display"),
        $frequency = $("#frequency"),
        $frequencyDisplay = $("#frequency-display"),
        $adminSalary = $("#admin-salary"),
        $computersPerAdmin = $("#computers-per-admin"),
        $annualizedComputerCost = $("#annualized-computer-cost");

    var $diyCostDisplay = $("#diy-total-cost-display"),
        $ondemandCostDisplay = $("#ondemand-total-cost-display")
        $computersRequiredDisplay = $("#computers-required-display"),
        $adminsRequiredDisplay = $("#admins-required-display"),
        $adminCostDisplay = $("#admin-cost-display");

    var getComputersPerAdmin = function() {
        return parseInt($computersPerAdmin.val());
    };

    var getAdminSalary = function() {
        return parseInt($adminSalary.val());
    };

    var getAnnualizedComputerCost = function() {
        return parseInt($annualizedComputerCost.val());
    };
        
    var adminCostFor = function(computers) {
        var adminCount = computers / 10;
        return adminCount * fullyBurden(adminSalary);
    };

    var calculateTotalMinutes = function(scripts, length, browsers) {
        return Math.max(1, (scripts * length * browsers))
    };

    var calculateOndemandCost = function(scripts, frequency, length, browsers) {
        return Math.round(calculateTotalMinutes(scripts, length, browsers) * 0.05) * frequency * 52; // 52 weeks in the year
    };

    var calculateComputersRequired = function(scripts, length, browsers, goalTime) {
        return Math.max(1, Math.round((scripts * length * browsers) / goalTime));
    };

    var calculateAnnualizedComputerCost = function(computerCount) {
        return getAnnualizedComputerCost() * computerCount;
    };

    var calculateAdminsRequired = function(computerCount) {
        return Math.round(computerCount / getComputersPerAdmin());
    };

    var fullyBurden = function(salary) {
        return salary * 1.5;
    };

    var updateTotalCost = function() {
        var computersRequired = calculateComputersRequired(parseInt($scriptCount.val()), parseInt($scriptLength.val()), parseInt($browserCount.val()), parseInt($goalTime.val())),
        annualizedComputerCost = calculateAnnualizedComputerCost(computersRequired),
        adminsRequired = calculateAdminsRequired(computersRequired),
        adminCost = fullyBurden(adminsRequired * getAdminSalary()),        
        diyTotalCost = annualizedComputerCost + adminCost;

        $computersRequiredDisplay.html(computersRequired);
        $("#admins-required").html(adminsRequired);
        //$adminsRequiredDisplay.html(adminsRequired);
        $("#computer-annualized-cost-display").html(annualizedComputerCost);
        $adminCostDisplay.html(adminCost);

        $("#diy-total-cost-display").html(diyTotalCost);

        $("#ondemand-total-cost-display").html(calculateOndemandCost(parseInt($scriptCount.val()), parseInt($frequency.val()), parseInt($scriptLength.val()), parseInt($browserCount.val())));
    };

    $frequency.bind('change',    function() { $frequencyDisplay.html($frequency.val());       updateTotalCost();});
    $scriptCount.bind('change',  function() { $scriptCountDisplay.html($scriptCount.val());   updateTotalCost();});
    $browserCount.bind('change', function() { $browserCountDisplay.html($browserCount.val()); updateTotalCost();});
    $scriptLength.bind('change', function() { $scriptLengthDisplay.html($scriptLength.val()); updateTotalCost();});
    $goalTime.bind    ('change', function() { $goalTimeDisplay.html($goalTime.val());         updateTotalCost();});

    $annualizedComputerCost.bind('change', function() { updateTotalCost();});
    $computersPerAdmin.bind     ('change', function() { updateTotalCost();});
    $adminSalary.bind           ('change', function() { updateTotalCost();});

    $("#price-small-shop").bind('click', function() {
        $computersPerAdmin.val(40);
        $adminSalary.val(60000);
        $annualizedComputerCost.val(3000);
        updateTotalCost();
    });

    $("#price-medium-shop").bind('click', function() {
        $computersPerAdmin.val(500);
        $adminSalary.val(75000);
        $annualizedComputerCost.val(4000);
        updateTotalCost();
    });

    $("#price-large-shop").bind('click', function() {
        $computersPerAdmin.val(800);
        $adminSalary.val(100000);
        $annualizedComputerCost.val(1500);
        updateTotalCost();
    });

    updateTotalCost();
});


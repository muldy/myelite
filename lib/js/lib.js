function updateTopBar(event) {
    $("#global_federation_pg").attr("aria-valuenow", event.Federation);
    $("#global_federation_pg").css("width", event.Federation + "%");
    $("#global_federation_pg").html(event.Federation + "%")

    $("#global_empire_pg").attr("aria-valuenow", event.Empire);
    $("#global_empire_pg").css("width", event.Empire + "%");
    $("#global_empire_pg").html(event.Empire + "%");

    $("#global_combat_pg").attr("aria-valuenow", event.Combat);
    $("#global_combat_pg").css("width", event.Combat + "%");
    $("#global_combat_pg").html(event.Combat + "%");

    $("#global_trade_pg").attr("aria-valuenow", event.Trade);
    $("#global_trade_pg").css("width", event.Trade + "%");
    $("#global_trade_pg").html(event.Trade + "%");

    $("#global_explore_pg").attr("aria-valuenow", event.Explore);
    $("#global_explore_pg").css("width", event.Explore + "%");
    $("#global_explore_pg").html(event.Explore + "%");

    $("#global_cqc_pg").attr("aria-valuenow", event.CQC);
    $("#global_cqc_pg").css("width", event.CQC + "%");
    $("#global_cqc_pg").html(event.CQC + "%");
}
function updateRank(event)
{
            $("#global_federation").html(global_ranks.federal[event.Federation]);
            $("#global_empire").html(global_ranks.emperial[event.Empire]);
            $("#global_combat").html(global_ranks.combat[event.Combat]);
            $("#global_trade").html(global_ranks.trade[event.Trade]);
            $("#global_explore").html(global_ranks.explore[event.Explore]);
            $("#global_cqc").html(global_ranks.cqc[event.CQC]);
}
package xyz.sudocat.ipldashboard.controller;

import org.springframework.web.bind.annotation.*;
import xyz.sudocat.ipldashboard.model.Match;
import xyz.sudocat.ipldashboard.model.Team;
import xyz.sudocat.ipldashboard.repository.MatchRepository;
import xyz.sudocat.ipldashboard.repository.TeamRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class TeamController {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setRecentMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));
        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year+1,1, 1);
        List<Match> matches = this.matchRepository.getMatchesByTeamBetweenDates(
                teamName, startDate, endDate);
        return matches;
    }

}

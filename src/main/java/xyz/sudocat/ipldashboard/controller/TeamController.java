package xyz.sudocat.ipldashboard.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import xyz.sudocat.ipldashboard.model.Team;
import xyz.sudocat.ipldashboard.repository.MatchRepository;
import xyz.sudocat.ipldashboard.repository.TeamRepository;

import java.util.Optional;

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
        Optional<Team> team = this.teamRepository.findByTeamName(teamName);
        if (team.isEmpty()) {
            return null;
        }
        team.get().setRecentMatches(matchRepository.findLatestMatchesByTeam(teamName, 4));
        return team.get();
    }

}

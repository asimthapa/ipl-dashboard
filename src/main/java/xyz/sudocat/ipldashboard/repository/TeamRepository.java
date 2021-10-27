package xyz.sudocat.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;
import xyz.sudocat.ipldashboard.model.Team;

import java.util.Optional;

public interface TeamRepository extends CrudRepository<Team, Long> {
    Team findByTeamName(String teamName);
}

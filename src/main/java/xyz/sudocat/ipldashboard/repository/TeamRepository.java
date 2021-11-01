package xyz.sudocat.ipldashboard.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import xyz.sudocat.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {
    Team findByTeamName(String teamName);

    Iterable<Team> findAll(Sort teamName);
}

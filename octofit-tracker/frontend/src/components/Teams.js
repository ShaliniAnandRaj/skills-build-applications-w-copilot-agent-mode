
const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', endpoint);
    axios.get(endpoint)
      .then(response => {
        const data = response.data.results ? response.data.results : response.data;
        setTeams(data);
        console.log('Fetched teams:', data);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="2" className="text-center">No teams found.</td></tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{team.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teams;


const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', endpoint);
    axios.get(endpoint)
      .then(response => {
        const data = response.data.results ? response.data.results : response.data;
        setLeaders(data);
        console.log('Fetched leaderboard:', data);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaders.length === 0 ? (
                <tr><td colSpan="3" className="text-center">No leaderboard data found.</td></tr>
              ) : (
                leaders.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.points}</td>
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

export default Leaderboard;

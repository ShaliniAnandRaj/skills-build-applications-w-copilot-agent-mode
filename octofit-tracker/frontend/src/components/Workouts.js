
const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', endpoint);
    axios.get(endpoint)
      .then(response => {
        const data = response.data.results ? response.data.results : response.data;
        setWorkouts(data);
        console.log('Fetched workouts:', data);
      })
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Workout Name</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="2" className="text-center">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{workout.name}</td>
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

export default Workouts;

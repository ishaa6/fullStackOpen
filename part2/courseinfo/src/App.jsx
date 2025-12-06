import courses from './Courses.jsx'

const Header = (props) => <h2>{props.course}</h2>

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <b>Number of exercises {props.total}</b>

const Course = ({course}) => {
  var totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header course={course.name} />
      {course.parts.map(part => (
          <Part part={part} />
      ))}
      <Total total={totalExercises} />
    </div>
  )
}

const App = () => {
  return courses.map(course => <Course course={course}/>)
}

export default App
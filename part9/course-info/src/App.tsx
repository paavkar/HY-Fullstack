interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: Array<string>;
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

const Header = ({ name }: { name: string }) => {
  return (
    <div>
      <h1> {name} </h1>
    </div>
  );
};

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div>
                <p>
                  <b>
                    {part.name} {part.exerciseCount}
                  </b>
                  <div>
                    <i>{part.description}</i>
                  </div>
                </p>
              </div>
            );
          case "group":
            return (
              <div>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <div>project exercises {part.groupProjectCount}</div>
              </div>
            );
          case "background":
            return (
              <div>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <div>
                  <i>{part.description}</i>
                </div>
                <div>submit to {part.backgroundMaterial}</div>
              </div>
            );
          case "special":
            return (
              <div>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <div>
                  <i>{part.description}</i>
                </div>
                required skills: {part.requirements.join(", ")}
              </div>
            );
          default:
            return <div></div>;
        }
      })}
    </div>
  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <Part courseParts={courseParts} />
    </div>
  );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;


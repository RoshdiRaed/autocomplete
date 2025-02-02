const tasksGenerator: Fig.Generator = {
  script: "command ant -p | grep -i '^\\s' | tr -d ' '",
  postProcess: (out) =>
    out.split("\n").map((task) => ({
      name: task,
      description: `Execute ${task} task`,
      type: "arg",
    })),
  cache: {
    cacheByDirectory: true,
    strategy: "stale-while-revalidate",
  },
};

const completionSpec: Fig.Spec = {
  name: "ant",
  description: "A software tool for automating software build processes",
  parserDirectives: {
    flagsArePosixNoncompliant: true,
  },
  options: [
    {
      name: ["--help", "-help", "-h"],
      description: "Show help for ant",
    },
    {
      name: "--noconfig",
      description:
        "Suppress sourcing of /etc/ant.conf, $HOME/.ant/ant.conf, and $HOME/.antrc configuration files",
    },
    {
      name: "--usejikes",
      description:
        "Enable use of jikes by default, unless set explicitly in configuration files",
    },
    {
      name: "--execdebug",
      description: "Print ant exec line generated by this launch script",
    },
    {
      name: ["-projecthelp", "-p"],
      description: "Print project help information and exit",
    },
    {
      name: "-version",
      description: "Print the version information and exit",
    },
    {
      name: "-diagnostics",
      description:
        "Print information that might be helpful to diagnose or report problems and exit",
    },
    {
      name: ["-quiet", "-q"],
      description: "Be extra quiet",
    },
    {
      name: ["-silent", "-S"],
      description: "Print nothing but task outputs and build failures",
    },
    {
      name: ["-verbose", "-v"],
      description: "Be extra verbose",
    },
    {
      name: ["-debug", "-d"],
      description: "Print debugging information",
    },
    {
      name: ["-emacs", "-e"],
      description: "Produce logging information without adornments",
    },
    {
      name: "-lib",
      description: "Specifies a path to search for jars and classes",
      args: {
        name: "path",
        template: "folders",
      },
    },
    {
      name: ["-logfile", "-l"],
      description: "Use given file for log",
      args: {
        name: "file",
        template: "filepaths",
      },
    },
    {
      name: "-logger",
      description: "The class which is to perform logging",
      args: {
        name: "classname",
      },
    },
    {
      name: "-listener",
      description: "Add an instance of class as a project listener",
      args: {
        name: "classname",
      },
    },
    {
      name: "-noinput",
      description: "Do not allow interactive input",
    },
    {
      name: ["-buildfile", "-file", "-f"],
      description: "Use given buildfile",
      args: {
        name: "file",
        template: "filepaths",
      },
    },
    {
      name: ["-keep-going", "-k"],
      description: "Execute all targets that do not depend on failed target(s)",
    },
    {
      name: "-propertyfile",
      description:
        "Load all properties from file with -D properties taking precedence",
      args: {
        name: "name",
        template: "filepaths",
      },
    },
    {
      name: "-inputhandler",
      description: "The class which will handle input requests",
      args: {
        name: "class",
      },
    },
    {
      name: ["-find", "-s"],
      description:
        "Search for buildfile towards the root of the filesystem and use it",
      args: {
        name: "file",
      },
    },
    {
      name: "-nice",
      description: "A niceness value for the main thread",
      args: {
        name: "number",
      },
    },
    {
      name: "-nouserlib",
      description:
        "Run ant without using the jar files from ${user.home}/.ant/lib",
    },
    {
      name: "-noclasspath",
      description: "Run ant without using CLASSPATH",
    },
    {
      name: "-autoproxy",
      description: "Java1.5+: use the OS proxy settings",
    },
    {
      name: "-main",
      description: "Override Ant's normal entry point",
      args: {
        name: "class",
      },
    },
  ],
  args: {
    name: "target",
    isVariadic: true,
    isOptional: true,
    generators: tasksGenerator,
  },
};
export default completionSpec;

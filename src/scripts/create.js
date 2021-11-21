const fs = require('fs');
const component = process.argv[2];
const exec = require('child_process').exec;
const originFile = "./src/components/template.html";
const htmlPath = "./src/components/";
const sassPath = "./src/assets/sass/components/";

// get origin file
fs.readFile(originFile, "utf-8", (err, data) => {
    if (err) throw err;
    const rename = data.replace(/COMPONENT_NAME/g, component);

    // check if this file is already exist
    if (fs.existsSync(`${htmlPath}/${component}.html`) || fs.existsSync(`${sassPath}/${component}.scss`)) {
        return console.log(`Sorry ${component} is already exist, Please choose another name`);
    };

    // create new files
    fs.writeFile(`${htmlPath}/${component}.html`, rename, (err) => {
        if (err) throw err;
        fs.writeFile(`${sassPath}/${component}.scss`, '', (err) => {
            if (err) throw err;

            // add this style into main style sass
            fs.appendFile(`${sassPath}/_components.scss`, `@import "${component}";\n`, (err) => {
                if (err) throw err;

                // open created files
                exec(`code -r ${htmlPath}/${component}.html ${sassPath}/${component}.scss`, (err) => {
                    if (err) throw err;
                });
                console.log("created Sucessfully");
            })
        });
    });
});
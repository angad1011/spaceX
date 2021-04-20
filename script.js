var launchyear, launchStatus, LandingStatus;
function fetchData(launchyear = null, launchstatus = null, landingstatus = null) {
    var url = "https://api.spacexdata.com/v3/launches?limit=100";
    if (launchstatus != null) {
        url += "&amp;launch_success=" + launchstatus;
    }
    if (landingstatus != null) {
        url += "&amp;land_success=" + LandingStatus;
    }
    if (launchyear != null) {
        url += "&amp;launch_year=" + launchyear;
    }
    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then((data) => {
            // Work with JSON data here
            // console.log(data);
            const html = data.map(mission => {
                // console.log(mission);
                return `
                    <div class="grid">
                    <div class="product-img">
                        <img src="${mission.links.mission_patch}" alt="program img">
                    </div>
                    <div class="mission-name">
                        <b>${mission.mission_name} #${mission.flight_number}</b>
                    </div>
                    <div class="mission-name">
                        <span><b>Mission IDs:</b>${mission.mission_id}</span>
                    </div>
                    <div class="launch-year">
                        <span><b>Launch Year:</b>${mission.launch_year}</span>
                    </div>
                    <div class="launch-status">
                        <span><b>Successful Launch:</b>${mission.launch_success}</span>
                    </div>
                    <div class="launch-status">
                        <span><b>Successful Landing:</b>${mission.land_success}</span>
                    </div>
                </div>
                    `;
            })
                .join("");
            // console.log(html);
            document.querySelector('.program-list').insertAdjacentHTML("afterbegin", html);
            // history.replaceState(null, null, url);
        })
        .catch((error) => {
            console.log(error);
        });
}
fetchData();
function byYear() {
    var year = document.getElementsByClassName("filterdata");
    console.log(year);
    for (var i = 0; i < year.length; i++) {
        (function (i) {
            year[i].addEventListener("click", function () {
                launchyear = this.value;

                var launchstatus = null;
                var checklaunch = document.querySelector('input[name="myRadios"]:checked');
                if (checklaunch != null) {
                    var launchstatus = checklaunch.value;
                }

                var landstatus = null;
                var checkland = document.querySelector('input[name="myLandStaus"]:checked');
                if (checkland != null) {
                    var landstatus = checkland.value;
                }



                fetchData(launchyear, launchstatus, landstatus);


            }, false);
        })(i);
    }
}
byYear();

function bylaunch() {
    var launch = document.getElementsByClassName("myRadioslaunch");
    console.log(launch);
    for (var i = 0; i < launch.length; i++) {
        (function (i) {
            launch[i].addEventListener("change", function () {
                launch = this.value;
                console.log(launch + ' change launch');


                var landstatus = null;
                var checkland = document.querySelector('input[name="myLandStaus"]:checked');
                if (checkland != null) {
                    var landstatus = checkland.value;
                }
                var yearstatus = null;
                var checklaunch = document.querySelector('input[name="myear"]:checked');
                if (checklaunch != null) {
                    var yearstatus = checklaunch.value;
                }

                fetchData(yearstatus, launch, landstatus);

            }, false);
        })(i);
    }
}
bylaunch();

function byland() {
    var land = document.getElementsByClassName("myLandStaus");
    console.log(land);
    for (var i = 0; i < land.length; i++) {
        (function (i) {
            land[i].addEventListener("change", function () {
                land = this.value;
                console.log(land + ' change land');

                var launchstatus = null;
                var checklaunch = document.querySelector('input[name="myRadios"]:checked');
                if (checklaunch != null) {
                    var launchstatus = checklaunch.value;
                }

                var yearstatus = null;
                var checkland = document.querySelector('input[name="myear"]:checked');
                if (checkland != null) {
                    var yearstatus = checkland.value;
                }

                fetchData(yearstatus, launchstatus, land);

            }, false);
        })(i);
    }
}
byland();
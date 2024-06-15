import os
import json
import pathlib

renders = os.listdir("images/renders")

total = len(renders)
dates = []

for render in renders:
    dates.append(os.path.getmtime(pathlib.PureWindowsPath(os.getcwd() + "\\images\\renders\\" + render).as_posix()))

sorted_dates, sorted_renders = zip(*sorted(zip(dates, renders), key= lambda x: x[0], reverse=True))

renders_dict = {"total":total, 
    "renders": sorted_renders,      
}

renders_json = json.dumps(renders_dict, indent=2)

with open("renders/renders.json", "w") as f:
    f.write(renders_json)
    f.close()
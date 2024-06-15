import os
import json
from datetime import datetime

simulations = os.listdir("simulations/markdown")
total = len(simulations)

simulations_files = []
simulations_dates = []
simulations_titles = []
simulations_description = []
simulations_src = []
to_sort_dates = []
date_format = '%d/%m/%Y'

for project in simulations:
    simulations_files.append(project)
    with open(f"simulations/markdown/{project}", "r") as f:
        lines = f.readlines()
        date_str = lines[1].split(": ")[1].split("\n")[0]
        to_sort_dates.append(datetime.strptime(date_str, date_format))
        simulations_dates.append(date_str)
        simulations_titles.append(lines[2].split(": ")[1].split("\n")[0])
        simulations_description.append(lines[3].split(": ")[1].split("\n")[0])
        simulations_src.append(lines[4].split(": ")[1].split("\n")[0])

sorted_dates, simulations_files, simulations_dates, simulations_titles, simulations_description, simulations_src = zip(*sorted(zip(to_sort_dates, 
        simulations_files, simulations_dates, simulations_titles, simulations_description, simulations_src), key= lambda x: x[0], reverse=True))

simulations_dict = {
  "total": total,
  "simulations_files": simulations_files,
  "simulations_dates": simulations_dates,
  "simulations_titles": simulations_titles,
  "simulations_description": simulations_description,
  "simulations_src": simulations_src,
}     

simulations_json = json.dumps(simulations_dict, indent=2)

with open("simulations/simulations.json", "w") as f:
    f.write(simulations_json)
    f.close()
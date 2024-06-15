import os
import json
from datetime import datetime

projects = os.listdir("projects/markdown")
total = len(projects)

projects_files = []
projects_dates = []
projects_titles = []
projects_description = []
projects_src = []
to_sort_dates = []
date_format = '%d/%m/%Y'

for project in projects:
    projects_files.append(project)
    with open(f"projects/markdown/{project}", "r") as f:
        lines = f.readlines()
        date_str = lines[1].split(": ")[1].split("\n")[0]
        to_sort_dates.append(datetime.strptime(date_str, date_format))
        projects_dates.append(date_str)
        projects_titles.append(lines[2].split(": ")[1].split("\n")[0])
        projects_description.append(lines[3].split(": ")[1].split("\n")[0])
        projects_src.append(lines[4].split(": ")[1].split("\n")[0])

sorted_dates, projects_files, projects_dates, projects_titles, projects_description, projects_src = zip(*sorted(zip(to_sort_dates, 
        projects_files, projects_dates, projects_titles, projects_description, projects_src), key= lambda x: x[0], reverse=True))

projects_dict = {
  "total": total,
  "projects_files": projects_files,
  "projects_dates": projects_dates,
  "projects_titles": projects_titles,
  "projects_description": projects_description,
  "projects_src": projects_src,
}     

projects_json = json.dumps(projects_dict, indent=2)

with open("projects/projects.json", "w") as f:
    f.write(projects_json)
    f.close()
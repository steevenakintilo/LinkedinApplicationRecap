"""File that compute all the data of the linkedin files"""

import calendar
import csv
import datetime as dtt
import json
import os

from datetime import datetime

class GenerateData():
    """GenerateData Class"""
    def __init__(self):
        self.archive_filepath : str = self.get_content_of_a_txt_file()
        self.filedata : list[list[str]] = []
        self.application_files_list : list[str] = []
        self.list_of_company: list[str] = []
        self.list_of_job_name: list[str] = []
        self.list_of_question: list[str] = []
        self.list_of_question_withouth_anser: list[str] = []
        self.list_of_word: list[str] = []
        self.all_date_of_application: list[str] = []
        self.all_date_of_application_good_format: list[str] = []
        self.all_date_of_application_good_format_excluding_weekend_day: list[str] = []
        self.lowest_date_of_application : str = ""
        self.last_date_of_application : str = ""
        self.list_of_application_by_day_name : list[str] = []
        self.list_of_question: list[str] = []
        self.application_rate_dict : dict[str:int] = {
            "hours":0,
            "days":0,
            "weeks":0,
            "months":0,
            "years":0,
            "decades":0            
        }

        self.weekday_name_english_to_french : dict[str:str] = {
            "Monday":"Lundi",
            "Tuesday":"Mardi",
            "Wednesday":"Mercredi",
            "Thursday":"Jeudi",
            "Friday":"Vendredi",
            "Saturday":"Samedi",
            "Sunday":"Dimanche",
        }

        self.today_date : datetime.date = datetime.now().date()
        self.data_dict = {
            "number_of_application":0,
            "number_of_application_ratio_by_day":[],
            "number_of_application_ratio":{},
            "number_of_application_sentence":"",
            "number_of_application_by_day_name_occurence":[],
            "number_of_application_by_day_name_ratio":[],
            "first_application_date":"",
            "last_application_date":"",
            "all_company": [],
            "number_of_company":0,
            "number_of_time_you_applied_to_a_company":[],
            "number_of_time_you_applied_to_a_company_ratio":[],
            "all_job_name":[],
            "number_of_different_job_name":[],
            "number_of_time_you_applied_to_a_job_name":[],
            "number_of_time_you_applied_to_a_job_name_ratio":[],
            "all_word":[],
            "number_of_different_word":0,
            "number_of_word":0,
            "all_word_occurence":[],
            "all_word_occurence_ratio":[],
            "all_word_occurence_to_job_name":[],
            "all_word_occurence_to_job_name_ratio":[],
            "all_question":[],
            "all_question_occurence":[],
            "all_question_occurence_ratio":[],

            "application_day_streak_occurence":[],
            "application_day_streak_value":[],

            "application_day_streak_excluding_weekend_occurence":[],
            "application_day_streak_excluding_weekend_value":[],

            "non_application_day_streak_value":[],
            "non_application_day_streak_occurence":[],

            "non_application_day_streak_excluding_weekend_occurence":[],
            "non_application_day_streak_excluding_weekend_value":[],

            "day_with_the_most_application":"",

            "number_of_day_you_applied":0,
            "number_of_day_you_applied_rate":0,
            "number_of_day_you_applied_you_didnt_apply":0,
            "number_of_day_you_applied_you_didnt_apply_rate":0,
            
            "number_of_day_you_applied_excluding_weekend":0,
            "number_of_day_you_applied_excluding_weekend_rate":0,
            "number_of_day_you_didnt_apply_excluding_weekend":0,
            "number_of_day_you_didnt_apply_excluding_weekend_rate":0,
            
            "all_day_application_occurence":[],
            "all_day_application_occurence_rate":[],
            "all_day_application_occurence_rate_value":[]            
        }

    def number_of_day_between_two_date(self,date1,date2,choose_today=False):
        """A function that compute the number of day between two date"""
        date_str = str(date2)
        if choose_today:
            date_ = datetime.strptime(date_str, '%Y-%m-%d').date()
            number_of_day_difference = str(self.today_date - date_).split(" ")[0].replace(" ","").strip()
        else:
            date_ = datetime.strptime(date_str, '%Y-%m-%d').date()
            date1_ = datetime.strptime(date1, '%Y-%m-%d').date()
            number_of_day_difference = str(date1_ - date_).split(" ")[0].replace(" ","").strip()
            if str(number_of_day_difference) == "0:00:00":
                return 0
        return int(number_of_day_difference)

    def get_content_of_a_txt_file(self):
        """A function that get the content of txt file"""
        f = open("archive_filepath.txt", 'r',encoding="utf-8")
        content = f.read()
        f.close()
        return content

    def get_content_of_a_csv_file(self,filepath):
        """A function that get the content of csv file"""
        with open(filepath, 'r',encoding="utf-8") as file:
            csvreader = csv.reader(file)
            for i , row in enumerate(csvreader):
                if i != 0:
                    self.filedata.append(row)

    def get_the_lowest_date_of_a_list(self,reverse=False):
        """A function that get the lowest date of a list"""
        lowest_date = "2/2/99"
        if reverse:
            lowest_date = "2/2/00"
        for date_of_application in list(set(self.all_date_of_application)):
            split_date = date_of_application.split("/")

            lowest_split_date = lowest_date.split("/")
            date1 = datetime(int("20"+split_date[2]), int(split_date[0]), int(split_date[1]))
            date2 = datetime(int("20"+lowest_split_date[2]), int(lowest_split_date[0]), int(lowest_split_date[1]))
            if reverse:
                if date1 >= date2:
                    lowest_date = date_of_application
            else:
                if date1 <= date2:
                    lowest_date = date_of_application


        lowest_split_date = lowest_date.split("/")
        if len(lowest_split_date[0]) == 1:
            lowest_split_date[0] = "0"+lowest_split_date[0]

        if len(lowest_split_date[1]) == 1:
            lowest_split_date[1] = "0"+lowest_split_date[1]

        return f"{lowest_split_date[1]}-{lowest_split_date[0]}-20{lowest_split_date[2]}"

    def sort_list_by_occurence(self,total_list,short_list,rate=False,return_more_data=False):
        "A function that sort list by occurence"
        list_of_element : list[str] = []
        occurence_of_element_list : list[int] = []

        result_list : list[str] = []
        for element in short_list:
            list_of_element.append(element)
            occurence_of_element_list.append(total_list.count(element))


        paired = list(zip(list_of_element, occurence_of_element_list))

        paired.sort(key=lambda x: x[1], reverse=True)

        list_of_element, occurence_of_element_list = zip(*paired)
        list_of_element = list(list_of_element)
        occurence_of_element_list = list(occurence_of_element_list)
        ratio_of_element_list = []

        # print(list_of_element[0:10])
        # print(occurence_of_element_list[0:10])
        # print(len(total_list))
        # print(len(short_list))

        if return_more_data and rate is False:
            return list_of_element , occurence_of_element_list

        divider = len(total_list)
        for elem , occurence_of_elem in zip(list_of_element,occurence_of_element_list):
            if rate:
    #            print(f"TRUE {elem} {occurence_of_elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
                result_list.append(f"{elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
                ratio_of_element_list.append(round(((occurence_of_elem/divider) * 100) , 2))
            else:
                result_list.append(f"{elem} {occurence_of_elem}")
    #            print(f"FALSE {elem} {occurence_of_elem}")

        if return_more_data and rate:
            return list_of_element , ratio_of_element_list

        return result_list

    def convert_date_to_right_format(self,date_,string_format=False):
        """A function that convert a date to the right format Year-Month-Day"""
        if date_ == "1234":
            return True
        
        if "/" not in str(date_) and "-" not in str(date_):
            return
        split_date = date_.split("/")
        if string_format:
            if len(split_date[0]) == 1:
                split_date[0] = "0"+split_date[0]

            if len(split_date[1]) == 1:
                split_date[1] = "0"+split_date[1]

            return f"20{split_date[2]}-{split_date[0]}-{split_date[1]}"
        return datetime(int(f"20{split_date[2]}"), int(split_date[0]), int(split_date[1]))
    
    def compute_day_streak(self,list_,weekend=False):
        """A function that compute the day streak of a list"""
        current_day = list_[0]
        index = 1
        streak_start = list_[0]
        list_of_streak = []
        list_of_streak_occurence = []
        weekday_name2 = ""
        weekday_name = ""
        for i , elem in  enumerate(list_):
            current_day = list_[i - 1]
            if i == 0:
                current_day = list_[0]
            if weekend:
                my_date = dtt.date(int(elem.split("-")[0]),int(elem.split("-")[1]),int(elem.split("-")[2]))
                my_date2 = dtt.date(int(current_day.split("-")[0]),int(current_day.split("-")[1]),int(current_day.split("-")[2]))

                weekday_name = calendar.day_name[my_date.weekday()]
                weekday_name2 = calendar.day_name[my_date2.weekday()]
                #print(current_day,elem,self.number_of_day_between_two_date(elem,current_day) , weekday_name2,weekday_name)

                #print(current_day,elem,self.number_of_day_between_two_date(elem,current_day))

            #print(self.number_of_day_between_two_date(elem,current_day))
            if self.number_of_day_between_two_date(elem,current_day) == 3 and i != 0 and weekend == True and weekday_name2 == "Friday" and weekday_name == "Monday":
                index+=3
            elif self.number_of_day_between_two_date(elem,current_day) == 1 and i != 0:
                index+=1
            elif i != 0:
                split_date = list(map(int , current_day.split("-")))
                streak_start = str(datetime(split_date[0], split_date[1], split_date[2]) - dtt.timedelta(days=(index - 1))).split(" ")[0]
                list_of_streak.append(f"{streak_start}:{current_day}")
                if index > 5:
                    index-=2
                list_of_streak_occurence.append(index)
                index = 1
            #print(current_day , elem, self.number_of_day_between_two_date(current_day,elem))



        paired = list(zip(list_of_streak, list_of_streak_occurence))

        paired.sort(key=lambda x: x[1], reverse=True)

        list_of_streak, list_of_streak_occurence = zip(*paired)

        list_of_streak = list(list_of_streak)
        list_of_streak_occurence = list(list_of_streak_occurence)


        # if weekend is False:
        #     print(list_of_streak)
        #     print(list_of_streak_occurence)

        return list_of_streak , list_of_streak_occurence


    def compute_non_day_streak(self,list_,weekend=False):
        current_day = list_[0]
        index = 0
        list_of_streak = []
        list_of_streak_occurence = []

        for i , elem in  enumerate(list_):
            current_day = list_[i - 1]
            if i == 0:
                current_day = list_[0]
            if weekend is False:
                if self.number_of_day_between_two_date(elem,current_day) > 1:
                    list_of_streak.append(f"{current_day}:{elem}")
                    list_of_streak_occurence.append(self.number_of_day_between_two_date(elem,current_day))

            if weekend:
                if self.number_of_day_between_two_date(elem,current_day) > 1:
                    for j in range(self.number_of_day_between_two_date(elem,current_day)):
                        split_date = list(map(int , current_day.split("-")))
                        new_date = str(datetime(split_date[0], split_date[1], split_date[2]) + dtt.timedelta(days=(j))).split(" ")[0]
                        my_date = dtt.date(int(new_date.split("-")[0]),int(new_date.split("-")[1]),int(new_date.split("-")[2]))
                        weekday_name = calendar.day_name[my_date.weekday()]
                        if weekday_name in ["Saturday","Sunday"]:
                            index-=1
                    list_of_streak.append(f"{current_day}:{elem}")
                    list_of_streak_occurence.append(self.number_of_day_between_two_date(elem,current_day) + index)
                    index = 0

        paired = list(zip(list_of_streak, list_of_streak_occurence))

        paired.sort(key=lambda x: x[1], reverse=True)

        list_of_streak, list_of_streak_occurence = zip(*paired)

        list_of_streak = list(list_of_streak)
        list_of_streak_occurence = list(list_of_streak_occurence)

        return list_of_streak , list_of_streak_occurence


    def sort_list_by_occurence2(self,total_list,short_list,rate=False):
        "A function that sort list by occurence"
        list_of_element : list[str] = []
        occurence_of_element_list : list[int] = []

        result_list : list[str] = []
        for element in short_list:
            if str(total_list).replace("-"," ").replace("–"," ").replace("/"," ").replace(","," ").replace("("," ").replace(")"," ").count(element) <= len(total_list):
                list_of_element.append(element)
                occurence_of_element_list.append(str(total_list).replace("-"," ").replace("–"," ").replace("/"," ").replace(","," ").replace("("," ").replace(")"," ").count(element))


        paired = list(zip(list_of_element, occurence_of_element_list))

        paired.sort(key=lambda x: x[1], reverse=True)

        list_of_element, occurence_of_element_list = zip(*paired)

        list_of_element = list(list_of_element)
        occurence_of_element_list = list(occurence_of_element_list)

        # print(list_of_element[0:10])
        # print(occurence_of_element_list[0:10])
        # print(len(total_list))
        # print(len(short_list))
        divider = len(total_list)
        for elem , occurence_of_elem in zip(list_of_element,occurence_of_element_list):
            if rate:
#                print(f"TRUE {elem} {occurence_of_elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
                result_list.append(f"{elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
            else:
                result_list.append(f"{elem} {occurence_of_elem}")
 #               print(f"FALSE {elem} {occurence_of_elem}")

        return result_list

    def write_into_json_file(self,path, data):
        """A function that write into a json file"""
        json_str = json.dumps(data, indent=4,ensure_ascii=False)

        with open(path, "w" , encoding="utf-8") as f:
            f.write(json_str)
        f.close()

    def get_number_of_weekend_day_between_two_dates(self,date1,date2,date1_datetime_format):
        weekday_day_nb = 0
        day_difference = self.number_of_day_between_two_date(date2,date1)
        for i in range(day_difference):
            current_day = str(date1_datetime_format + dtt.timedelta(days=(i))).split(" ")[0]            
            my_date = dtt.date(int(current_day.split("-")[0]),int(current_day.split("-")[1]),int(current_day.split("-")[2]))
            weekday_name = calendar.day_name[my_date.weekday()]
            self.list_of_application_by_day_name.append(self.weekday_name_english_to_french[weekday_name])
            if weekday_name in ["Saturday","Sunday"]:
                weekday_day_nb+=1
            #streak_start = str(datetime(split_date[0], split_date[1], split_date[2]) - dtt.timedelta(days=(index - 1))).split(" ")[0]

        return weekday_day_nb
    def main_function(self,choosen_date1="",choosen_date2=""):
        """A function that compute the whole data"""
        disclamer_choice = input("Ecrit 1234 pour ne pas avoir à choisir de date sinon presse entrer: ")
        if disclamer_choice == "1234":
            choosen_date1 = datetime(2000,1,1)
            choosen_date2 = datetime(3000,1,1)
            choosen_date1_string = "2000-01-01"
            choosen_date2_string = "3000-01-01"
            #choosen_date2 = self.today_date
        elif disclamer_choice == "9":
            choosen_date1 = datetime(2025,9,27)
            choosen_date2 = datetime(2026,2,20)
            choosen_date1_string = "2025-9-27"
            choosen_date2_string = "2026-2-20"
        elif disclamer_choice == "8":
            choosen_date1 = datetime(2026,1,1)
            choosen_date2 = datetime(2026,2,20)
            choosen_date1_string = "2026-1-1"
            choosen_date2_string = "2026-2-20"
        
            
        else:
            choice1 = input("Choisie une date de début sous le format Année-Mois-Jour exemple 11-05-2022: ").replace("/","-")
            choice2 = input("Choisie une date de fin sous le format Année-Mois-Jour exemple 11-06-2023: ").replace("/","-")
            try:
                choosen_date1 = datetime(int(choice1.split("-")[2]), int(choice1.split("-")[1]), int(choice1.split("-")[0]))
                choosen_date2 = datetime(int(choice2.split("-")[2]), int(choice2.split("-")[1]), int(choice2.split("-")[0]))
                if choosen_date1 == choosen_date2:
                    print("Les dates ne peuvent pas être les mêmes")

                if choosen_date1 > choosen_date2:
                    print("La date 1 doit être supérieur à la date 2")

            except ValueError:
                print("Erreur de date recommence")
                return

            #choosen_date1 = "2025-09-27"
            choosen_date1_string = f"{choice1.split("-")[2]}-{choice1.split("-")[1]}-{choice1.split("-")[0]}"
            choosen_date2_string = f"{choice2.split("-")[2]}-{choice2.split("-")[1]}-{choice2.split("-")[0]}"

            #choosen_date2 = self.today_date
            #choosen_date1 = datetime(2026, 1, 1)
            # #choosen_date1 = datetime(2025, 9, 27)
            # print(choosen_date1_string)
            # print(choosen_date2_string)
            
            #choosen_date2 = datetime(2026, 2, 20)


        forbiden_words_for_question = ['email address', 'mobile phone number', 'adresse e-mail', 'numéro de téléphone', 'your title:ingénieur', 'degree:', 'school:', 'location (city)', 'pdf', ' description:', 'your title:', 'of study:', 'teléfono móvil', 'company:', '@', 'employment:', 'letter:',"diploma:","last name","first name","description:"]
        forbiden_words_for_word = ["on","in","en","ne","de","se","x","#","|","-","_","&"]
        all_jobs_files = os.listdir(rf"{self.archive_filepath}\Jobs")
        for file in all_jobs_files:
            if "Applications" in file:
                self.application_files_list.append(rf"{self.archive_filepath}\Jobs\{file}")
        for file in self.application_files_list:
            self.get_content_of_a_csv_file(file)

        
        for line in self.filedata:            
            if (choosen_date1 <= self.convert_date_to_right_format(line[0].split(",")[0]) <= choosen_date2) or self.convert_date_to_right_format(disclamer_choice):
                self.list_of_company.append(line[3])
                self.list_of_job_name.append(line[4].lower())
                self.all_date_of_application.append(line[0].split(",")[0])
                self.all_date_of_application_good_format.append(self.convert_date_to_right_format(line[0].split(",")[0],True))

                my_date = dtt.date(int(self.all_date_of_application_good_format[-1].split("-")[0]),int(self.all_date_of_application_good_format[-1].split("-")[1]),int(self.all_date_of_application_good_format[-1].split("-")[2]))
                weekday_name = calendar.day_name[my_date.weekday()]
                self.list_of_application_by_day_name.append(self.weekday_name_english_to_french[weekday_name])
                if weekday_name not in ["Saturday","Sunday"]:
                    self.all_date_of_application_good_format_excluding_weekend_day.append(self.convert_date_to_right_format(line[0].split(",")[0],True))

                for word in line[4].replace("-"," ").replace("–"," ").replace("/"," ").replace(","," ").replace("("," ").replace(")"," ").split(" "):
                    if len(word) > 0 and word.lower() not in forbiden_words_for_word and word.isdigit() is False:
                        self.list_of_word.append(word.lower())

                for lin in line[7].split("|"):
                    if len(lin) > 1:
                        find = False
                        for words in forbiden_words_for_question:
                            if words in lin.lower():
                                find = True
                                break
                        if find:
                            break

                        if lin[0] == " ":
                            lin = lin[1:]

                        self.list_of_question.append(lin.replace('\xa0',''))
                        self.list_of_question_withouth_anser.append(lin.replace('\xa0','').split(":")[0])

        self.data_dict["number_of_application"] = len(self.list_of_company)
        if len(self.list_of_company) == 0:
            print("Désole tu n'a pas postulé une seul fois durant cette période")
            return
        self.data_dict["all_company"] = list(set(self.list_of_company))
        self.data_dict["number_of_company"] = len(list(set(self.list_of_company)))
        self.data_dict["all_job_name"] = list(set(self.list_of_job_name))
        self.data_dict["number_of_different_job_name"] = len(list(set(self.list_of_job_name)))
        self.data_dict["all_word"] = list(set(self.list_of_word))
        self.data_dict["number_of_different_word"] = len(list(set(self.list_of_word)))
        self.data_dict["number_of_word"] = len(list(self.list_of_word))
        self.data_dict["all_question"] = list(set(self.list_of_question_withouth_anser))
        self.data_dict["number_of_time_you_applied_to_a_company"] = self.sort_list_by_occurence(self.list_of_company,list(set(self.list_of_company)),False)
        self.data_dict["number_of_time_you_applied_to_a_company_ratio"] = self.sort_list_by_occurence(self.list_of_company,list(set(self.list_of_company)),True)
        self.data_dict["number_of_time_you_applied_to_a_job_name"] = self.sort_list_by_occurence(self.list_of_job_name,list(set(self.list_of_job_name)),False)
        self.data_dict["number_of_time_you_applied_to_a_job_name_ratio"] = self.sort_list_by_occurence(self.list_of_job_name,list(set(self.list_of_job_name)),True)
        self.data_dict["all_word_occurence"] = self.sort_list_by_occurence(self.list_of_word,list(set(self.list_of_word)),False)
        self.data_dict["all_word_occurence_to_job_name"] = self.sort_list_by_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),False)
        self.data_dict["all_word_occurence_ratio"] = self.sort_list_by_occurence(self.list_of_word,list(set(self.list_of_word)),True)
        self.data_dict["all_word_occurence_to_job_name_ratio"] = self.sort_list_by_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),True)
        self.data_dict["all_question_occurence"] = self.sort_list_by_occurence(self.list_of_question_withouth_anser,list(set(self.list_of_question_withouth_anser)),False)
        self.data_dict["all_question_occurence_ratio"] = self.sort_list_by_occurence(self.list_of_question_withouth_anser,list(set(self.list_of_question_withouth_anser)),True)
        self.data_dict["number_of_time_you_applied_to_a_job_name"] = self.sort_list_by_occurence(self.list_of_job_name,list(set(self.list_of_job_name)),False)
        self.data_dict["all_day_application_occurence"] ,self.data_dict["all_day_application_occurence_rate"] = self.sort_list_by_occurence(self.all_date_of_application_good_format,list(set(self.all_date_of_application_good_format)),False,True)
        self.data_dict["all_day_application_occurence_rate_value"] = self.sort_list_by_occurence(self.all_date_of_application_good_format,list(set(self.all_date_of_application_good_format)),True,True)[1]
        self.data_dict["day_with_the_most_application"] = self.data_dict["all_day_application_occurence"][0]
        self.lowest_date_of_application = self.get_the_lowest_date_of_a_list()
        self.last_date_of_application = self.get_the_lowest_date_of_a_list(True)
        self.data_dict["first_application_date"] = self.lowest_date_of_application
        self.data_dict["last_application_date"] = self.last_date_of_application
        self.all_date_of_application_good_format = list(set(self.all_date_of_application_good_format))
        self.all_date_of_application_good_format.sort(key=lambda date: datetime.strptime(date, '%Y-%m-%d'))
        self.compute_day_streak(self.all_date_of_application_good_format)
        self.all_date_of_application_good_format_excluding_weekend_day = list(set(self.all_date_of_application_good_format_excluding_weekend_day))
        self.all_date_of_application_good_format_excluding_weekend_day.sort(key=lambda date: datetime.strptime(date, '%Y-%m-%d'))
        self.compute_day_streak(self.all_date_of_application_good_format_excluding_weekend_day,True)
        self.data_dict["application_day_streak_occurence"] = self.compute_day_streak(self.all_date_of_application_good_format)[1]
        self.data_dict["application_day_streak_value"] = self.compute_day_streak(self.all_date_of_application_good_format)[0]
        self.data_dict["application_day_streak_excluding_weekend_occurence"] = self.compute_day_streak(self.all_date_of_application_good_format,True)[1]
        self.data_dict["application_day_streak_excluding_weekend_value"] = self.compute_day_streak(self.all_date_of_application_good_format,True)[0]
        self.data_dict["non_application_day_streak_occurence"] = self.compute_non_day_streak(self.all_date_of_application_good_format)[1]
        self.data_dict["non_application_day_streak_value"] = self.compute_non_day_streak(self.all_date_of_application_good_format)[0]
        self.data_dict["non_application_day_streak_excluding_weekend_occurence"] = self.compute_non_day_streak(self.all_date_of_application_good_format,True)[1]
        self.data_dict["non_application_day_streak_excluding_weekend_value"] = self.compute_non_day_streak(self.all_date_of_application_good_format,True)[0]
        self.data_dict["number_of_application_by_day_name_occurence"] = self.sort_list_by_occurence(self.list_of_application_by_day_name,list(set(self.list_of_application_by_day_name)),False)
        self.data_dict["number_of_application_by_day_name_ratio"] = self.sort_list_by_occurence(self.list_of_application_by_day_name,list(set(self.list_of_application_by_day_name)),True)
        
        
        # "number_of_application_by_day_name_occurence":[],
        # "number_of_application_by_day_name_ratio":[],

        # ici aussi

        #day_difference = self.number_of_day_between_two_date(self.today_date,self.lowest_date_of_application)
        if disclamer_choice == "1234":
            choosen_date1_string = str(self.lowest_date_of_application)
            choosen_date2_string = str(self.last_date_of_application)
            
            choosen_date1_string = f"{str(self.lowest_date_of_application).split("-")[2]}-{str(self.lowest_date_of_application).split("-")[1]}-{str(self.lowest_date_of_application).split("-")[0]}"
            choosen_date2_string = f"{str(self.last_date_of_application).split("-")[2]}-{str(self.last_date_of_application).split("-")[1]}-{str(self.last_date_of_application).split("-")[0]}"
            
            day_difference = self.number_of_day_between_two_date(choosen_date2_string,choosen_date1_string)
        else:
            day_difference = self.number_of_day_between_two_date(choosen_date2_string,choosen_date1_string)
        self.data_dict["number_of_application_ratio_by_day"] = round(int(self.data_dict["number_of_application"])/day_difference,1)

        hours_time = False
        if round(int(self.data_dict["number_of_application"])/day_difference) > 24:
            hours_time = True
            self.application_rate_dict["hours"] = round(round((int(self.data_dict["number_of_application"])/day_difference), 3) * 10)

        else:
            self.application_rate_dict.pop("hours")

        self.application_rate_dict["days"] = round(int(self.data_dict["number_of_application"])/day_difference,1)
        self.application_rate_dict["weeks"] = round(round(int(self.data_dict["number_of_application"])/day_difference,1) * 7)
        self.application_rate_dict["months"] = round(round(int(self.data_dict["number_of_application"])/day_difference,1) * (365.25/12))
        self.application_rate_dict["years"] = round(round(int(self.data_dict["number_of_application"])/day_difference,1) * 365.25)
        self.application_rate_dict["decades"] = round(round(int(self.data_dict["number_of_application"])/day_difference,1) * 3650.25)


        if hours_time is False:
            self.data_dict["number_of_application_sentence"] = f"Tu as postulé à {int(self.data_dict["number_of_application"])} offre(s) entre le {choosen_date1_string} et le {choosen_date2_string} en {day_difference} jour(s) ce qui fait une  moyenne de {self.application_rate_dict["days"]} candidatures par jours , {self.application_rate_dict["weeks"]} candidatures par semaines , {self.application_rate_dict["months"]} candidatures par mois , {self.application_rate_dict["years"]} candidatures par années , {self.application_rate_dict["decades"]} candidatures par décennies"
        else:
            self.data_dict["number_of_application_sentence"] = f"Tu as postulé à {int(self.data_dict["number_of_application"])} offre(s) entre le {choosen_date1_string} et le {choosen_date2_string} en {day_difference} jour(s) ce qui fait une  moyenne de {self.application_rate_dict["hours"]} candidatures par heures , {self.application_rate_dict["days"]} candidatures par jours , {self.application_rate_dict["weeks"]} candidatures par semaines , {self.application_rate_dict["months"]} candidatures par mois , {self.application_rate_dict["years"]} candidatures par années , {self.application_rate_dict["decades"]} candidatures par décennies"

        self.data_dict["number_of_application_ratio"] = self.application_rate_dict
        self.data_dict["number_of_day_you_applied"] = len(list(set(self.all_date_of_application)))
        self.data_dict["number_of_day_you_applied_rate"] = round(len(list(set(self.all_date_of_application)))/day_difference , 1) * 100
        self.data_dict["number_of_day_you_applied_you_didnt_apply"] = day_difference - len(list(set(self.all_date_of_application)))
        self.data_dict["number_of_day_you_applied_you_didnt_apply_rate"] = round((day_difference - len(list(set(self.all_date_of_application))))/day_difference , 1) * 100
        
        self.write_into_json_file("data.json",self.data_dict)
        
        weekday_day_nb = self.get_number_of_weekend_day_between_two_dates(choosen_date1_string,choosen_date2_string,choosen_date1)


        
        #print(day_difference - weekday_day_nb , day_difference , weekday_day_nb)
        self.data_dict["number_of_day_you_applied_excluding_weekend"] = len(list(set(self.all_date_of_application_good_format_excluding_weekend_day)))
        self.data_dict["number_of_day_you_applied_excluding_weekend_rate"] = round(len(list(set(self.all_date_of_application_good_format_excluding_weekend_day)))/(day_difference - weekday_day_nb) , 1) * 100
        self.data_dict["number_of_day_you_didnt_apply_excluding_weekend"] = day_difference - len(list(set(self.all_date_of_application_good_format_excluding_weekend_day))) - weekday_day_nb
        self.data_dict["number_of_day_you_didnt_apply_excluding_weekend_rate"] = round((day_difference - len(list(set(self.all_date_of_application_good_format_excluding_weekend_day))) - weekday_day_nb)/(day_difference - weekday_day_nb) , 1) * 100
        
        
        # Heures
        # Jours
        # Semaines
        # Mois
        # Années
        # Décennies
        # "number_of_day_you_applied":0,
        # "number_of_day_you_applied_rate":0,
        # "number_of_day_you_applied_you_didnt_apply":0,
        # "number_of_day_you_applied_you_didnt_apply_rate":0,

        print_dict = True
        if print_dict:
            for a , b in self.data_dict.items():
                try:
                    if a not in ["day_with_the_most_application","number_of_application_sentence","first_application_date","last_application_date"]:
                        print(f"{a}   {b[0:5]}")
                    else:
                        print(f"{a}   {b}")
                except:
                    print(f"{a}   {b}")

            # print(list(set(self.list_of_question_withouth_anser)))
        # self.sort_list_by_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),True)

        #print(list(set(self.list_of_word)))
        # print(self.list_of_word)
        # print(len(self.list_of_word))
        # print(len(list(set(self.list_of_word))))

        #print(self.data_dict)
        # print(len(self.list_of_job_name))
        # print(len(list(set(self.list_of_job_name))))

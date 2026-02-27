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
        self.linkedin_filepath = os.getcwd().replace(r"\linkedin_backend",r"\core\archive_filepath.txt")
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
        self.all_date_of_application_good_format2: list[str] = []
        self.all_date_of_application_good_format_excluding_weekend_day: list[str] = []
        self.all_date_of_application_good_format_excluding_weekend_day2: list[str] = []
        
        self.number_of_application_on_weekend: int = 0
        self.number_of_non_application_on_weekend: int = 0
        
        self.lowest_date_of_application : str = ""
        self.last_date_of_application : str = ""
        self.list_of_application_per_day_name2 : list[str] = []
        self.list_of_application_per_day_name : list[str] = []
        self.list_of_application_per_year: list[str] = []
        self.list_of_application_per_month: list[str] = []
        self.list_of_application_per_month_distinct: list[str] = []
        self.list_of_application_per_hour : list[str] = []
        self.number_of_application_on_odd_day : int = 0
        self.number_of_application_on_even_day : int = 0
        
        self.number_of_day_between_first_and_last_application : int = 0
        self.list_of_question: list[str] = []
        self.number_of_question_per_application: list[int] = []
        self.number_of_question_per_application2: list[int] = []
        
        self.application_rate_dict : dict[str:int] = {
            "hours":0,
            "days":0,
            "weeks":0,
            "months":0,
            "years":0,
            "decades":0            
        }

        self.number_to_month: dict[int:str] = {
            1:"Janvier",
            2:"Février",
            3:"Mars",
            4:"Avril",
            5:"Mai",
            6:"Juin",
            7:"Juillet",
            8:"Août",
            9:"Septembre",
            10:"Octobre",
            11:"Novembre",
            12:"Décembre",
            
        }
        self.weekday_name_english_to_date : dict[str:str] = {
            "Monday":"2000-01-01",
            "Tuesday":"2001-01-01",
            "Wednesday":"2002-01-01",
            "Thursday":"2003-01-01",
            "Friday":"2004-01-01",
            "Saturday":"2005-01-01",
            "Sunday":"2006-01-01",
            
        }

        self.date_to_weekname : dict[str:str] = {
            "2000-01-01":"Monday",
            "2001-01-01":"Tuesday",
            "2002-01-01":"Wednesday",
            "2003-01-01":"Thursday",
            "2004-01-01":"Friday",
            "2005-01-01":"Saturday",
            "2006-01-01":"Sunday",
            
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
        self.number_of_application_with_question : int = 0
        self.number_of_application_withouth_question : int = 0
        
        self.data_dict = {
            "number_of_application":0,
            "number_of_application_ratio_per_day":[],
            "number_of_application_ratio":{},
            "number_of_application_sentence":"",
            "number_of_application_per_day_name_value":[],
            "number_of_application_per_day_name_occurence":[],
            "number_of_application_per_day_name_ratio":[],
            "number_of_application_per_hour_value":[],
            "number_of_application_per_hour_occurence":[],
            "number_of_application_per_hour_ratio":[],
            
            "first_application_date":"",
            "last_application_date":"",
            "all_company": [],
            "number_of_company":0,
            "number_of_time_you_applied_to_a_company_value":[],
            "number_of_time_you_applied_to_a_company_occurence":[],
            "number_of_time_you_applied_to_a_company_ratio":[],
            "all_job_name":[],
            "number_of_different_job_name":[],
            "number_of_time_you_applied_to_a_job_name_value":[],
            "number_of_time_you_applied_to_a_job_name_occurence":[],
            "number_of_time_you_applied_to_a_job_name_ratio":[],
            "all_word":[],
            "number_of_different_word":0,
            "number_of_word":0,
            "all_word_sorted_value":[],
            "all_word_occurence":[],
            "all_word_occurence_ratio":[],
            "all_word_occurence_to_job_name_value":[],
            "all_word_occurence_to_job_name_occurence":[],
            "all_word_occurence_to_job_name_ratio":[],
            "all_question":[],
            "all_question_sorted_value":[],
            "all_question_occurence":[],
            "all_question_occurence_ratio":[],
            "number_of_question":0,
            "number_of_different_question":0,
            "number_of_application_with_question":0,
            "number_of_application_withouth_question":0,
            "number_of_application_with_question_ratio":0,
            "number_of_application_withouth_question_ratio":0,
            "application_day_streak_occurence":[],
            "application_day_streak_value":[],

            "number_of_question_per_application_value":[],
            "number_of_question_per_application_occurence":[],
            "number_of_question_per_application_ratio":[],

            "number_of_question_per_application_value2":[],
            "number_of_question_per_application_occurence2":[],
            "number_of_question_per_application_ratio2":[],
            
            "number_of_question_per_application_value_sorted":[],
            "number_of_question_per_application_occurence_sorted":[],
            
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
            "all_day_application_occurence_rate_value":[],
            "number_of_application_per_day_name_value_sorted":[],
            "number_of_application_per_day_name_occurence_sorted":[],
            "number_of_application_per_hour_value_sorted":[],
            "number_of_application_per_hour_occurence_sorted":[],
            "all_day_application_occurence_rate_value_sorted":[],
            "all_day_application_occurence_sorted":[],
            
            "all_day_application_occurence_rate_value_sorted2":[],
            "all_day_application_occurence_sorted2":[],

            "number_of_application_per_year_value":[],
            "number_of_application_per_year_occurence":[],
            "number_of_application_per_year_rate":[],
            
            "number_of_application_per_month_value":[],
            "number_of_application_per_month_occurence":[],
            "number_of_application_per_month_rate":[],

            "number_of_application_per_distinct_month_value":[],
            "number_of_application_per_distinct_month_occurence":[],
            "number_of_application_per_distinct_month_rate":[],

            "number_of_postualation_on_odd_day":0,
            "number_of_postualation_on_odd_day_ratio":0,

            "number_of_postualation_on_even_day":0,
            "number_of_postualation_on_even_day_ratio":0,
            "number_of_day_between_first_and_last_application":0,
            "number_of_question_in_average_per_application":0,
            "number_of_question_in_average_per_application_withouth_0":0,
            "number_of_application_on_weekend":0,
            "number_of_non_application_on_weekend":0,
            "rate_of_application_on_non_weekend_day":0,
            "rate_of_application_on_weekend_day":0,
            "rate_of_application_based_only_on_weekend_day":0,
            "rate_of_non_application_based_only_on_weekend_day":0,
            "weekday_day_nb":0,
            "choosen_date1":"",
            "choosen_date2":"",
            "number_of_application_per_distinct_month_value_sorted":[],
            "number_of_application_per_distinct_month_occurence_sorted":[]
            
        }


    def sort_list_by_date(self,list_of_element , list_of_date,change_back_to_weekday=False,month=False):
        """A function that sort list by date"""
        paired = list(zip(list_of_date, list_of_element))
        
        if month:
            paired.sort(key=lambda date: datetime.strptime(date[0], '%Y-%m'))
        else:
            paired.sort(key=lambda date: datetime.strptime(date[0], '%Y-%m-%d'))
        
        try:
            list_of_date , list_of_element= zip(*paired)
        except:
            return [] , []
        list_of_element = list(list_of_element)
        list_of_date = list(list_of_date)
        if change_back_to_weekday:
            list_of_date_ = []
            for dt in list_of_date:
                if month:
                    good_month = dt[-2:]
                    if good_month[0] == "0":
                        good_month = good_month[1]
                    good_month = int(good_month)
                    list_of_date_.append(self.number_to_month[good_month])
                else:
                    list_of_date_.append(self.weekday_name_english_to_french[self.date_to_weekname[dt]])
            
            return list_of_date_ , list_of_element
        return list_of_date , list_of_element

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
        return int(number_of_day_difference) + 1

    def get_content_of_a_txt_file(self):
        """A function that get the content of txt file"""
        f = open(fr"{"archive_filepath.txt"}", 'r',encoding="utf-8")
        content = f.read()
        f.close()
        return content

    def get_content_of_a_csv_file(self,filepath):
        """A function that get the content of csv file"""
        with open(filepath, 'r',encoding="utf-8") as file:
            csvreader = csv.reader(file)
            for i , row in enumerate(csvreader):
                if i != 0 and row not in self.filedata:
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

    def sort_list_per_occurence(self,total_list,short_list,rate=False,return_more_data=False):
        "A function that sort list by occurence"
        list_of_element : list[str] = []
        occurence_of_element_list : list[int] = []

        result_list : list[str] = []
        for element in short_list:
            list_of_element.append(element)
            occurence_of_element_list.append(total_list.count(element))


        paired = list(zip(list_of_element, occurence_of_element_list))

        paired.sort(key=lambda x: x[1], reverse=True)

        try:
            list_of_element, occurence_of_element_list = zip(*paired)
        except:
            return [] , []
        list_of_element = list(list_of_element)
        occurence_of_element_list = list(occurence_of_element_list)
        ratio_of_element_list = []

        # print(list_of_element[0:10])
        # print(occurence_of_element_list[0:10])
        # print(len(total_list))
        # print(len(short_list))

        if return_more_data and rate is False:
            return list_of_element , occurence_of_element_list
        
        reminder = 2
        divider = len(total_list)
        for elem , occurence_of_elem in zip(list_of_element,occurence_of_element_list):
            if rate:
    #            print(f"TRUE {elem} {occurence_of_elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
                result_list.append(f"{elem} {round(((occurence_of_elem/divider) * 100) , reminder)}")
                ratio_of_element_list.append(round(((occurence_of_elem/divider) * 100) , reminder))
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
            if weekend:
                #print(i , self.number_of_day_between_two_date(elem,current_day) ,my_date , my_date2 , weekday_name,weekday_name2)
                #print(elem,current_day,self.number_of_day_between_two_date(elem,current_day) , index)
                pass
            # if self.number_of_day_between_two_date(elem,current_day) == 3 and i != 0 and weekend == True and weekday_name2 == "Friday" and weekday_name == "Monday":
            #     index+=3
            
            if self.number_of_day_between_two_date(elem,current_day) == 2 and i != 0:
                index+=1
            elif i != 0:
                split_date = list(map(int , current_day.split("-")))
                streak_start = str(datetime(split_date[0], split_date[1], split_date[2]) - dtt.timedelta(days=(index - 1))).split(" ")[0]
                list_of_streak.append(f"{streak_start}:{current_day}")
                # if weekend:
                #     print(list_of_streak , "zob ")
                
                if index > 5 and weekend is False:
                    index-=2
                list_of_streak_occurence.append(index)
                index = 1
            #print(current_day , elem, self.number_of_day_between_two_date(current_day,elem))



        # print(list_of_streak , len(list_of_streak), weekend)
        # print(list_of_streak_occurence , len(list_of_streak) , weekend)
        
        paired = list(zip(list_of_streak, list_of_streak_occurence))

        paired.sort(key=lambda x: x[1], reverse=True)

        try:
            list_of_streak, list_of_streak_occurence = zip(*paired)
        except:
            return [] , []
        
        list_of_streak = list(list_of_streak)
        list_of_streak_occurence = list(list_of_streak_occurence)


        # if weekend is False:
        #     print(list_of_streak)
        #     print(list_of_streak_occurence)

        return list_of_streak , list_of_streak_occurence


    def compute_week_streak(self,list_,all_date,all_date_application_occurence,counting=False,sort=False):
        """A function that compute the day streak of a list"""
        current_day = list_[0]
        list_of_streak = []
        list_of_streak_occurence = []
        index_week = 1
        number_of_apply_this_week = 0
        apply_week_list = []
        
        for i , elem in  enumerate(all_date):
            if i % 7 == 0 and i != 0:    
                current_day = all_date[i - 6]
                if (i - 6) <= 0:
                    current_day = all_date[0]        
            
            if i == 0:
                current_day = all_date[0]
            
            if i % 7 == 0 and i != 0 or (i + 1 == len(all_date)):
                #print(f"Week nb: {index_week} {current_day}-{elem}")
                applied_on_this_list = False
                for j in range(7):
                    split_date = current_day.split("-")
                    curent_date = str(datetime(int(split_date[0]), int(split_date[1]), int(split_date[2])) + dtt.timedelta(days=(j))).split(" ")[0]
                    #print("ddy " , curent_date)
                    
                    if curent_date in list_ and counting is False:
                        applied_on_this_list = True
                        apply_week_list.append({current_day}-{elem})
                        break
                    
                    if counting and curent_date in list_:
                    #    print("yooo " , curent_date,all_date_application_occurence[all_date.index(curent_date)])
                        number_of_apply_this_week+=all_date_application_occurence[all_date.index(curent_date)]
                    
                    if j == 6 and counting:
                        #print(f"Week nb: {index_week} {current_day}  :  {elem}" , number_of_apply_this_week)
                        list_of_streak_occurence.append(number_of_apply_this_week)
                        list_of_streak.append(f"{current_day}:{elem}")
                        number_of_apply_this_week = 0
                        index_week+=1
                
                if i + 1 == len(all_date) and counting is False:
                    if applied_on_this_list:
                        #print(f"You apply on this week {current_day}-{elem}")
                        index_week+=1
                    if len(apply_week_list) == 1:
                        list_of_streak.append(f"{apply_week_list[0]}:{apply_week_list[0]}")
                    
                    elif len(apply_week_list) > 1:
                        list_of_streak.append(f"{apply_week_list[0]}:{apply_week_list[-1]}")
                    
                    list_of_streak_occurence.append(len(apply_week_list))
                    index_week = 1
                    apply_week_list = []
                    break
                if applied_on_this_list:
                    index_week+=1
                
                elif applied_on_this_list is False and counting is False:
                    #print(f"You didn't apply on this week {current_day}-{elem}")
                    if len(apply_week_list) == 1:
                        list_of_streak.append(f"{apply_week_list[0]}:{apply_week_list[0]}")
                    
                    elif len(apply_week_list) > 1:
                        list_of_streak.append(f"{apply_week_list[0]}:{apply_week_list[-1]}")
                    
                    if len(apply_week_list) != 0:
                        list_of_streak_occurence.append(len(apply_week_list))
                    
                    
                    index_week = 1
                    apply_week_list = []
            
        if counting and sort == False:
            return list_of_streak , list_of_streak_occurence
        paired = list(zip(list_of_streak, list_of_streak_occurence))

        paired.sort(key=lambda x: x[1], reverse=True)

        try:
            list_of_streak, list_of_streak_occurence = zip(*paired)
        except:
            return [] , []
        
        list_of_streak = list(list_of_streak)
        list_of_streak_occurence = list(list_of_streak_occurence)

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

        try:
            list_of_streak, list_of_streak_occurence = zip(*paired)
        except:
            return [] , []
        
        list_of_streak = list(list_of_streak)
        list_of_streak_occurence = list(list_of_streak_occurence)

        return list_of_streak , list_of_streak_occurence


    def compute_non_week_streak(self,list_,all_date):
        """A function that compute the day streak of a list"""
        current_day = list_[0]
        list_of_streak = []
        list_of_streak_occurence = []
        apply_week_list = []
        for i , elem in  enumerate(all_date):
            if i % 7 == 0 and i != 0:    
                current_day = all_date[i - 6]
                if (i - 6) <= 0:
                    current_day = all_date[0]        
            
            if i == 0:
                current_day = all_date[0]
            
            if i % 7 == 0 and i != 0 or (i + 1 == len(all_date)):
                #print(f"Week nb: {index_week} {current_day}-{elem}")
                applied_on_this_list = True
                for j in range(7):
                    split_date = current_day.split("-")
                    curent_date = str(datetime(int(split_date[0]), int(split_date[1]), int(split_date[2])) + dtt.timedelta(days=(j))).split(" ")[0]
                    #print("ddy " , curent_date)

                    if curent_date in list_:
                        applied_on_this_list = False
                        break
                    if j == 6:
                        apply_week_list.append({current_day}-{elem})
                        
            
                if applied_on_this_list is False and {current_day}-{elem} not in apply_week_list:
                
                    if len(apply_week_list) == 1:
                        list_of_streak.append(f"{apply_week_list[-1]}:{apply_week_list[-1]}")
                        list_of_streak_occurence.append(len(apply_week_list))
                        apply_week_list = []
                    
                    elif len(apply_week_list) > 1:
                        #print(apply_week_list , len(apply_week_list))
                        list_of_streak.append(f"{apply_week_list[0]}:{apply_week_list[-1]}")
                        list_of_streak_occurence.append(len(apply_week_list))
                        apply_week_list = []
                      
                    
                if i + 1 == len(all_date):
                    if len(apply_week_list) == 1:
                        list_of_streak.append(f"{apply_week_list[-1]}:{apply_week_list[-1]}")
                    
                    elif len(apply_week_list) > 1:
                        list_of_streak.append(f"{apply_week_list[0]}:{apply_week_list[-1]}")
                    

                    
                    apply_week_list = []
                    break
        
        paired = list(zip(list_of_streak, list_of_streak_occurence))

        paired.sort(key=lambda x: x[1], reverse=True)

        try:
            list_of_streak, list_of_streak_occurence = zip(*paired)
        except:
            return [] , []
        
        list_of_streak = list(list_of_streak)
        list_of_streak_occurence = list(list_of_streak_occurence)

        # if weekend is False:
        #     print(list_of_streak)
        #     print(list_of_streak_occurence)

        return list_of_streak , list_of_streak_occurence

    def sort_list_per_occurence2(self,total_list,short_list,rate=False,return_more_data=False):
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

        try:
            list_of_element, occurence_of_element_list = zip(*paired)
        except:
            return [] , []
        
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
#                print(f"TRUE {elem} {occurence_of_elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
                result_list.append(f"{elem} {round(((occurence_of_elem/divider) * 100) , 2)}")
                ratio_of_element_list.append(round(((occurence_of_elem/divider) * 100) , 2))
            else:
                result_list.append(f"{elem} {occurence_of_elem}")
#               print(f"FALSE {elem} {occurence_of_elem}")
        if return_more_data and rate:
            return list_of_element , ratio_of_element_list

        return result_list

    def write_into_json_file(self,path, data):
        """A function that write into a json file"""
        json_str = json.dumps(data, indent=4,ensure_ascii=False)

        with open(path, "w" , encoding="utf-8") as f:
            f.write(json_str)
        f.close()

    def get_number_of_weekend_day_between_two_dates(self,date1,date2,date1_datetime_format):
        "A function that get the number of weekend day between two dates"
        weekday_day_nb = 0
        day_difference = self.number_of_day_between_two_date(date2,date1)
        for i in range(day_difference):
            current_day = str(date1_datetime_format + dtt.timedelta(days=(i))).split(" ")[0]            
            my_date = dtt.date(int(current_day.split("-")[0]),int(current_day.split("-")[1]),int(current_day.split("-")[2]))
            weekday_name = calendar.day_name[my_date.weekday()]
            self.list_of_application_per_day_name.append(self.weekday_name_english_to_french[weekday_name])
            if weekday_name in ["Saturday","Sunday"]:
                weekday_day_nb+=1
            #streak_start = str(datetime(split_date[0], split_date[1], split_date[2]) - dtt.timedelta(days=(index - 1))).split(" ")[0]

        return weekday_day_nb
    
    def min_and_max_date_of_applicaton(self):
        """A function that get the first and last application date"""
        all_jobs_files = os.listdir(rf"{self.archive_filepath}\Jobs")
        for file in all_jobs_files:
            if "Applications" in file:
                self.application_files_list.append(rf"{self.archive_filepath}\Jobs\{file}")
        
        for file in self.application_files_list:
            self.get_content_of_a_csv_file(file)

        for line in self.filedata:            
            self.all_date_of_application.append(line[0].split(",")[0])

        self.lowest_date_of_application = self.get_the_lowest_date_of_a_list()
        self.last_date_of_application = self.get_the_lowest_date_of_a_list(True)
        return self.lowest_date_of_application , self.last_date_of_application
    

    def count_the_number_of_question_of_a_string(self,question_string,forbiden_words_for_question):
        "A function that count the number of a question from a string"

        number_of_question = 0
        question_string = question_string.lower()
        for lin in question_string.split("|"):
            if len(lin) > 1:
                for words in forbiden_words_for_question:
                    if words in lin.lower():
                        number_of_question-=1
                        break
                #if find:
                #    break
                number_of_question+=1
            else:
                return 1
        
        if number_of_question <= 0:
            number_of_question = 0
        
        return number_of_question
    
    def main_function(self,choosen_date1="",choosen_date2=""):
        """A function that compute the whole data"""
        disclamer_choice = input("Ecrit 1234 pour ne pas avoir à choisir de date sinon presse entrer: ")
        min_date , max_date = self.min_and_max_date_of_applicaton()
        print(min_date)
        print(max_date)
        if disclamer_choice == "1234":
            choosen_date1 = datetime(2000,1,1)
            choosen_date2 = datetime(3000,1,1)
            choosen_date1_string = "2000-01-01"
            choosen_date2_string = "3000-01-01"
            #choosen_date2 = self.today_date
        
        # elif disclamer_choice == "9":
        #     choosen_date1 = datetime(2025,9,27)
        #     choosen_date2 = datetime(2026,2,20)
        #     choosen_date1_string = "2025-9-27"
        #     choosen_date2_string = "2026-2-20"
        # elif disclamer_choice == "8":
        #     choosen_date1 = datetime(2026,1,1)
        #     choosen_date2 = datetime(2026,2,20)
        #     choosen_date1_string = "2026-1-1"
        #     choosen_date2_string = "2026-2-20"
        
            
        else:
            min_date , max_date = self.min_and_max_date_of_applicaton()
            print(f"Les dates doivent être entre {min_date} et {max_date} pour ne pas avoir de bug")
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


        forbiden_words_for_question = ['email address', 'mobile phone number', 'adresse e-mail', 'numéro de téléphone', 'your title:ingénieur', 'degree:', 'school:', 'location (city)', '.pdf', ' description:', 'your title:', 'of study:', 'teléfono móvil', 'company:', '@', 'employment:', 'letter:',"diploma:","last name","first name","description:"]
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
                self.all_date_of_application_good_format2.append(self.convert_date_to_right_format(line[0].split(",")[0],True))
                
                my_date = dtt.date(int(self.all_date_of_application_good_format[-1].split("-")[0]),int(self.all_date_of_application_good_format[-1].split("-")[1]),int(self.all_date_of_application_good_format[-1].split("-")[2]))
                weekday_name = calendar.day_name[my_date.weekday()]
                self.list_of_application_per_day_name.append(self.weekday_name_english_to_french[weekday_name])
                self.list_of_application_per_day_name2.append(self.weekday_name_english_to_date[weekday_name])
                self.list_of_application_per_year.append(int(self.all_date_of_application_good_format[-1].split("-")[0]))
                self.list_of_application_per_month.append(int(self.all_date_of_application_good_format[-1].split("-")[1]))
                self.list_of_application_per_month_distinct.append(f"{(self.all_date_of_application_good_format[-1].split("-")[0])}-{(self.all_date_of_application_good_format[-1].split("-")[1])}")
                
                # self.number_of_application_on_odd_day
                # self.number_of_application_on_even_day
                
                day_number = self.all_date_of_application_good_format[-1].split("-")[2]
                if day_number[0] == "0":
                    day_number = day_number[1]

                day_number = int(day_number)

                if day_number % 2 == 0:
                    self.number_of_application_on_even_day+=1
                else:
                    self.number_of_application_on_odd_day+=1
                # list_of_application_per_odd_day
                # list_of_application_per_odd_day

                if line[0].split(" ")[2] == "AM":
                    if int(line[0].split(" ")[1].split(":")[0]) < 12:
                        self.list_of_application_per_hour.append(str(int(line[0].split(" ")[1].split(":")[0]) + 9))
                    else:
                        self.list_of_application_per_hour.append(str(int(line[0].split(" ")[1].split(":")[0]) - 3)) 
                    
                else:
                    if int(line[0].split(" ")[1].split(":")[0]) in [10,11]:
                        self.list_of_application_per_hour.append(str(int(line[0].split(" ")[1].split(":")[0]) - 3))
                    else:
                        self.list_of_application_per_hour.append(str(int(line[0].split(" ")[1].split(":")[0]) + 9))
                
                
                if weekday_name not in ["Saturday","Sunday"]:
                    self.all_date_of_application_good_format_excluding_weekend_day.append(self.convert_date_to_right_format(line[0].split(",")[0],True))
                    self.all_date_of_application_good_format_excluding_weekend_day2.append(self.convert_date_to_right_format(line[0].split(",")[0],True))
                    
                if weekday_name in ["Saturday","Sunday"]:
                    self.number_of_application_on_weekend+=1
                for word in line[4].replace("-"," ").replace("–"," ").replace("/"," ").replace(","," ").replace("("," ").replace(")"," ").split(" "):
                    if len(word) > 0 and word.lower() not in forbiden_words_for_word and word.isdigit() is False:
                        self.list_of_word.append(word.lower())

                
                if len(line[7]) == 0:
                    self.number_of_application_withouth_question+=1
                    self.number_of_question_per_application2.append(0)
                else:
                    if self.count_the_number_of_question_of_a_string(line[7],forbiden_words_for_question) > 0:
                        self.number_of_question_per_application.append(self.count_the_number_of_question_of_a_string(line[7],forbiden_words_for_question))
                        self.number_of_question_per_application2.append(self.count_the_number_of_question_of_a_string(line[7],forbiden_words_for_question))
                        self.number_of_application_with_question+=1
                    else:
                        self.number_of_application_withouth_question+=1
                        self.number_of_question_per_application2.append(0)
                
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

        number_of_apply = len(self.list_of_company)
        self.data_dict["number_of_application"] = len(self.list_of_company)
        if len(self.list_of_company) == 0:
            print("Désole tu n'a pas postulé une seul fois durant cette période")
            return []
        self.data_dict["all_company"] = list(set(self.list_of_company))
        self.data_dict["number_of_company"] = len(list(set(self.list_of_company)))
        self.data_dict["all_job_name"] = list(set(self.list_of_job_name))
        self.data_dict["number_of_different_job_name"] = len(list(set(self.list_of_job_name)))
        self.data_dict["all_word"] = list(set(self.list_of_word))
        self.data_dict["number_of_different_word"] = len(list(set(self.list_of_word)))
        self.data_dict["number_of_word"] = len(list(self.list_of_word))
        self.data_dict["all_question"] = list(set(self.list_of_question_withouth_anser))

        self.lowest_date_of_application = self.get_the_lowest_date_of_a_list()
        self.last_date_of_application = self.get_the_lowest_date_of_a_list(True)
        self.data_dict["first_application_date"] = self.lowest_date_of_application
        self.data_dict["last_application_date"] = self.last_date_of_application
        self.all_date_of_application_good_format = list(set(self.all_date_of_application_good_format))
        self.all_date_of_application_good_format.sort(key=lambda date: datetime.strptime(date, '%Y-%m-%d'))
        #self.compute_day_streak(self.all_date_of_application_good_format)
        self.all_date_of_application_good_format_excluding_weekend_day = list(set(self.all_date_of_application_good_format_excluding_weekend_day))
        self.all_date_of_application_good_format_excluding_weekend_day.sort(key=lambda date: datetime.strptime(date, '%Y-%m-%d'))
        #self.compute_day_streak(self.all_date_of_application_good_format_excluding_weekend_day,True)
        self.data_dict["application_day_streak_occurence"] = self.compute_day_streak(self.all_date_of_application_good_format)[1]
        self.data_dict["application_day_streak_value"] = self.compute_day_streak(self.all_date_of_application_good_format)[0]

        self.data_dict["application_day_streak_excluding_weekend_occurence"] = self.compute_day_streak(self.all_date_of_application_good_format_excluding_weekend_day,True)[1]
        self.data_dict["application_day_streak_excluding_weekend_value"] = self.compute_day_streak(self.all_date_of_application_good_format_excluding_weekend_day,True)[0]
        
        self.data_dict["non_application_day_streak_occurence"] = self.compute_non_day_streak(self.all_date_of_application_good_format)[1]
        self.data_dict["non_application_day_streak_value"] = self.compute_non_day_streak(self.all_date_of_application_good_format)[0]
        
        self.data_dict["non_application_day_streak_excluding_weekend_occurence"] = self.compute_non_day_streak(self.all_date_of_application_good_format,True)[1]
        self.data_dict["non_application_day_streak_excluding_weekend_value"] = self.compute_non_day_streak(self.all_date_of_application_good_format,True)[0]
        
        self.data_dict["number_of_application_per_day_name_value"] = self.sort_list_per_occurence(self.list_of_application_per_day_name,list(set(self.list_of_application_per_day_name)),False,True)[0]
        self.data_dict["number_of_application_per_day_name_occurence"] = self.sort_list_per_occurence(self.list_of_application_per_day_name,list(set(self.list_of_application_per_day_name)),False,True)[1]
        self.data_dict["number_of_application_per_day_name_ratio"] = self.sort_list_per_occurence(self.list_of_application_per_day_name,list(set(self.list_of_application_per_day_name)),True,True)[1]
        

        self.data_dict["number_of_application_per_hour_value"] = self.sort_list_per_occurence(self.list_of_application_per_hour,list(set(self.list_of_application_per_hour)),False,True)[0]
        self.data_dict["number_of_application_per_hour_occurence"] = self.sort_list_per_occurence(self.list_of_application_per_hour,list(set(self.list_of_application_per_hour)),False,True)[1]
        self.data_dict["number_of_application_per_hour_ratio"] = self.sort_list_per_occurence(self.list_of_application_per_hour,list(set(self.list_of_application_per_hour)),True,True)[1]


        self.data_dict["number_of_time_you_applied_to_a_company_value"] = self.sort_list_per_occurence(self.list_of_company,list(set(self.list_of_company)),False,True)[0]
        self.data_dict["number_of_time_you_applied_to_a_company_occurence"] = self.sort_list_per_occurence(self.list_of_company,list(set(self.list_of_company)),False,True)[1]
        self.data_dict["number_of_time_you_applied_to_a_company_ratio"] = self.sort_list_per_occurence(self.list_of_company,list(set(self.list_of_company)),True,True)[1]
        
        
        
        self.data_dict["number_of_time_you_applied_to_a_job_name_value"] = self.sort_list_per_occurence(self.list_of_job_name,list(set(self.list_of_job_name)),False,True)[0]
        self.data_dict["number_of_time_you_applied_to_a_job_name_occurence"] = self.sort_list_per_occurence(self.list_of_job_name,list(set(self.list_of_job_name)),False,True)[1]
        self.data_dict["number_of_time_you_applied_to_a_job_name_ratio"] = self.sort_list_per_occurence(self.list_of_job_name,list(set(self.list_of_job_name)),True,True)[1]
        
        self.data_dict["all_word_sorted_value"] = self.sort_list_per_occurence(self.list_of_word,list(set(self.list_of_word)),False,True)[0]
        self.data_dict["all_word_occurence"] = self.sort_list_per_occurence(self.list_of_word,list(set(self.list_of_word)),False,True)[1]
        self.data_dict["all_word_occurence_ratio"] = self.sort_list_per_occurence(self.list_of_word,list(set(self.list_of_word)),True,True)[1]
        

        self.data_dict["all_word_occurence_to_job_name_value"] = self.sort_list_per_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),False,True)[0]
        self.data_dict["all_word_occurence_to_job_name_occurence"] = self.sort_list_per_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),False,True)[1]
        self.data_dict["all_word_occurence_to_job_name_ratio"] = self.sort_list_per_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),True,True)[1]
        

        self.data_dict["all_question_sorted_value"] = self.sort_list_per_occurence(self.list_of_question_withouth_anser,list(set(self.list_of_question_withouth_anser)),False,True)[0]
        self.data_dict["all_question_occurence"] = self.sort_list_per_occurence(self.list_of_question_withouth_anser,list(set(self.list_of_question_withouth_anser)),False,True)[1]
        self.data_dict["all_question_occurence_ratio"] = self.sort_list_per_occurence(self.list_of_question_withouth_anser,list(set(self.list_of_question_withouth_anser)),True,True)[1]
        



        
        
        self.data_dict["number_of_question_per_application_value"] = self.sort_list_per_occurence(self.number_of_question_per_application,list(set(self.number_of_question_per_application)),False,True)[0]
        self.data_dict["number_of_question_per_application_occurence"] = self.sort_list_per_occurence(self.number_of_question_per_application,list(set(self.number_of_question_per_application)),False,True)[1]
        self.data_dict["number_of_question_per_application_ratio"] = self.sort_list_per_occurence(self.number_of_question_per_application,list(set(self.number_of_question_per_application)),True,True)[1]
        
        self.data_dict["number_of_question_per_application_value2"] = self.sort_list_per_occurence(self.number_of_question_per_application2,list(set(self.number_of_question_per_application2)),False,True)[0]
        self.data_dict["number_of_question_per_application_occurence2"] = self.sort_list_per_occurence(self.number_of_question_per_application2,list(set(self.number_of_question_per_application2)),False,True)[1]
        self.data_dict["number_of_question_per_application_ratio2"] = self.sort_list_per_occurence(self.number_of_question_per_application2,list(set(self.number_of_question_per_application2)),True,True)[1]


        
        self.data_dict["number_of_question_in_average_per_application"] = round(sum(self.number_of_question_per_application2)/number_of_apply)
        self.data_dict["number_of_question_in_average_per_application_withouth_0"] = round(sum(self.number_of_question_per_application)/(number_of_apply - self.number_of_application_withouth_question))

        
        #print((round(sum(self.number_of_question_per_application2)/len(self.number_of_question_per_application2)) , 2) * 100)
        

        a = self.sort_list_per_occurence(self.number_of_question_per_application,list(set(self.number_of_question_per_application)),False,True)[0]
        b = self.sort_list_per_occurence(self.number_of_question_per_application,list(set(self.number_of_question_per_application)),False,True)[1]
        paired = list(zip(b,a))

        paired.sort(key=lambda x: x[1])
        b , a = zip(*paired)
        a = list(a)
        b = list(b)
        c , d = [] , []            


        for i in range(0,a[-1] + 1):
            if i not in a and i != 0:
                c.append(i)
                d.append(0)
            elif i == 0:
                c.append(0)
                d.append(self.number_of_application_withouth_question)
            else:
                c.append(i)
                d.append(b[a.index(i)])

        
        self.data_dict["number_of_question_per_application_value_sorted"] = c
        self.data_dict["number_of_question_per_application_occurence_sorted"] = d
        self.data_dict["number_of_question"] = len(self.list_of_question_withouth_anser)
        self.data_dict["number_of_different_question"] = len(list(set(self.list_of_question_withouth_anser)))
        

        self.data_dict["number_of_application_with_question"] = self.number_of_application_with_question
        self.data_dict["number_of_application_withouth_question"] = self.number_of_application_withouth_question
        
        self.data_dict["number_of_application_withouth_question_ratio"] = round(self.number_of_application_withouth_question/len(self.list_of_company) , 2) * 100
        self.data_dict["number_of_application_with_question_ratio"] = round(self.number_of_application_with_question/len(self.list_of_company) , 2) * 100
        

        if len(list(set(self.list_of_application_per_month))) > 1:    
            a = self.sort_list_per_occurence(self.list_of_application_per_month,list(set(self.list_of_application_per_month)),False,True)[0]
            b = self.sort_list_per_occurence(self.list_of_application_per_month,list(set(self.list_of_application_per_month)),False,True)[1]
            c = self.sort_list_per_occurence(self.list_of_application_per_month,list(set(self.list_of_application_per_month)),True,True)[1]

            paired = list(zip(b,a,c))

            paired.sort(key=lambda x: x[1])
            b , a , c = zip(*paired)
            a = list(a)
            b = list(b)
            c = list(c)
            
            list_of_month = []

            for number in a:
                list_of_month.append(self.number_to_month[number])
            self.data_dict["number_of_application_per_month_value"] = list_of_month
            self.data_dict["number_of_application_per_month_occurence"] = b
            self.data_dict["number_of_application_per_month_rate"] = c

                        
            a = self.sort_list_per_occurence(self.list_of_application_per_month_distinct,list(set(self.list_of_application_per_month_distinct)),False,True)[0]
            b = self.sort_list_per_occurence(self.list_of_application_per_month_distinct,list(set(self.list_of_application_per_month_distinct)),False,True)[1]
            b2 = self.sort_list_per_occurence(self.list_of_application_per_month_distinct,list(set(self.list_of_application_per_month_distinct)),True,True)[1]
            
            c = self.sort_list_per_occurence(self.list_of_application_per_month_distinct,list(set(self.list_of_application_per_month_distinct)),True,True)[1]
            

            #    "number_of_application_per_distinct_month_value": [],
            #     "number_of_application_per_distinct_month_occurence": [],
            #     "number_of_application_per_distinct_month_rate": [],
 

            list_of_month = []
            for data in self.sort_list_by_date(b,a,False,True)[0]:
                data = data.split("-")
                month = str(data[1])
                if month[0] == "0":
                    month=month[1]
                list_of_month.append(f"{self.number_to_month[int(month)]} {data[0]}")
            
            
            self.data_dict["number_of_application_per_distinct_month_value"] = list_of_month
            self.data_dict["number_of_application_per_distinct_month_occurence"] = self.sort_list_by_date(b,a,False,True)[1]
            self.data_dict["number_of_application_per_distinct_month_rate"] = self.sort_list_by_date(b2,a,True,True)[1]
            
            


        if len(list(set(self.list_of_application_per_year))) > 1:
            
            
            
            self.data_dict["number_of_application_per_year_value"] = self.sort_list_per_occurence(self.list_of_application_per_year,list(set(self.list_of_application_per_year)),False,True)[0]
            self.data_dict["number_of_application_per_year_occurence"] = self.sort_list_per_occurence(self.list_of_application_per_year,list(set(self.list_of_application_per_year)),False,True)[1]
            self.data_dict["number_of_application_per_year_rate"] = self.sort_list_per_occurence(self.list_of_application_per_year,list(set(self.list_of_application_per_year)),True,True)[1]
            
            
            self.list_of_application_per_year.append(int(self.all_date_of_application_good_format[-1].split("-")[0]))

                
        

        self.data_dict["all_day_application_occurence"] = self.sort_list_per_occurence(self.all_date_of_application_good_format2,list(set(self.all_date_of_application_good_format2)),False,True)[1]
        self.data_dict["all_day_application_occurence_rate"] = self.sort_list_per_occurence(self.all_date_of_application_good_format2,list(set(self.all_date_of_application_good_format2)),True,True)[1]
        self.data_dict["all_day_application_occurence_rate_value"] = self.sort_list_per_occurence(self.all_date_of_application_good_format,list(set(self.all_date_of_application_good_format)),True,True)[0]
        
        self.data_dict["day_with_the_most_application"] = self.data_dict["all_day_application_occurence_rate_value"][0]
        
        
        a, b = self.sort_list_per_occurence(self.list_of_application_per_day_name2,list(set(self.list_of_application_per_day_name2)),False,True)
        
        self.data_dict["number_of_application_per_day_name_value_sorted"] = self.sort_list_by_date(b,a,True)[0]
        self.data_dict["number_of_application_per_day_name_occurence_sorted"] = self.sort_list_by_date(b,a,True)[1]
        
        for elem , elem2 in zip(self.data_dict["number_of_application_per_hour_value"],self.data_dict["number_of_application_per_hour_occurence"]):
            if int(elem) not in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]:
                a.append(int(elem))
                b.append(0)
            else:
                a.append(int(elem))
                b.append(elem2)

        a = []
        b = []

        for i in range(24):
            a.append(i)
            if str(i) in self.data_dict["number_of_application_per_hour_value"]:
                b.append(self.data_dict["number_of_application_per_hour_occurence"][self.data_dict["number_of_application_per_hour_value"].index(str(i))])
            else:
                b.append(0)

        self.data_dict["number_of_application_per_hour_value_sorted"] = list(map(str,a))
        self.data_dict["number_of_application_per_hour_occurence_sorted"] = b

        # "number_of_application_per_day_name_value_sorted":[],
        # "number_of_application_per_day_name_occurence_sorted":[]      
    
        # "number_of_application_per_day_name_occurence":[],
        # "number_of_application_per_day_name_ratio":[],

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
        
        if len(list(set(self.all_date_of_application))) > day_difference:
            day_difference = len(list(set(self.all_date_of_application)))
        

        #a , b = self.sort_list_by_date(self.data_dict["all_day_application_occurence"],self.data_dict["all_day_application_occurence_rate_value"])
        a , b , c = [] , [] , []

        for i in range(day_difference+1):
            next_day = str(choosen_date1 + dtt.timedelta(days=(i))).split(" ")[0]
            if next_day not in self.data_dict["all_day_application_occurence_rate_value"]:
                a.append(next_day)
                b.append(0)
                c.append(0)
            else:
                a.append(next_day)
                b.append(self.data_dict["all_day_application_occurence"][self.data_dict["all_day_application_occurence_rate_value"].index(str(next_day))])
                c.append(100)
        #streak_start = str(datetime(split_date[0], split_date[1], split_date[2]) - dtt.timedelta(days=(index - 1))).split(" ")[0]

        self.data_dict["all_day_application_occurence_rate_value_sorted"] = a
        self.data_dict["all_day_application_occurence_rate_value_sorted2"] = a
        self.data_dict["all_day_application_occurence_sorted"] = b
        self.data_dict["all_day_application_occurence_sorted2"] = c
        self.data_dict["number_of_application_ratio_per_day"] = round(int(self.data_dict["number_of_application"])/day_difference,1)
        
        
        self.data_dict["application_week_streak"] = self.compute_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"],self.data_dict["all_day_application_occurence_sorted"])[0]
        self.data_dict["application_week_streak_occurence"] = self.compute_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"],self.data_dict["all_day_application_occurence_sorted"])[1]
        
        self.data_dict["non_application_week_streak"] = self.compute_non_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"])[0]
        self.data_dict["non_application_week_streak_occurence"] = self.compute_non_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"])[1]
        

        self.data_dict["application_per_week_value"] = self.compute_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"],self.data_dict["all_day_application_occurence_sorted"],True,True)[0]
        self.data_dict["application_per_week_occurence"] = self.compute_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"],self.data_dict["all_day_application_occurence_sorted"],True,True)[1]
        self.data_dict["application_per_week_value_sorted"] = self.compute_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"],self.data_dict["all_day_application_occurence_sorted"],True,False)[0]
        self.data_dict["application_per_week_occurence_sorted"] = self.compute_week_streak(self.all_date_of_application_good_format,self.data_dict["all_day_application_occurence_rate_value_sorted2"],self.data_dict["all_day_application_occurence_sorted"],True,False)[1]
        self.data_dict["number_of_week_you_applied"] = len(self.data_dict["application_per_week_value"]) - self.data_dict["application_per_week_occurence_sorted"].count(0)
        self.data_dict["number_of_week_you_didnt_applied"] = self.data_dict["application_per_week_occurence_sorted"].count(0)
        
        
        self.data_dict["number_of_week_you_didnt_applied_rate"] = round(self.data_dict["number_of_week_you_didnt_applied"] / len(self.data_dict["application_per_week_value"]) * 100,1)
        self.data_dict["number_of_week_you_applied_rate"] = round(self.data_dict["number_of_week_you_applied"] / len(self.data_dict["application_per_week_value"]) * 100,1)
        
        
        if self.data_dict["number_of_application_ratio_per_day"] == 0.0:
            self.data_dict["number_of_application_ratio_per_day"] = round(int(self.data_dict["number_of_application"])/day_difference,5)
        
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

        if round(int(self.data_dict["number_of_application"])/day_difference,1) == 0:
            self.application_rate_dict["days"] = round(int(self.data_dict["number_of_application"])/day_difference,5)
            self.application_rate_dict["weeks"] = round(round(int(self.data_dict["number_of_application"])/day_difference,5) * 7)
            self.application_rate_dict["months"] = round(round(int(self.data_dict["number_of_application"])/day_difference,5) * (365.25/12))
            self.application_rate_dict["years"] = round(round(int(self.data_dict["number_of_application"])/day_difference,5) * 365.25)
            self.application_rate_dict["decades"] = round(round(int(self.data_dict["number_of_application"])/day_difference,5) * 3650.25)


        if hours_time is False:
            self.data_dict["number_of_application_sentence"] = f"Tu as postulé à {int(self.data_dict["number_of_application"])} offre(s) entre le {choosen_date1_string} et le {choosen_date2_string} en {day_difference} jour(s) ce qui fait une  moyenne de {self.application_rate_dict["days"]} candidatures par jour , {self.application_rate_dict["weeks"]} candidatures par semaines , {self.application_rate_dict["months"]} candidatures par mois , {self.application_rate_dict["years"]} candidatures par années , {self.application_rate_dict["decades"]} candidatures par décennies"
        else:
            self.data_dict["number_of_application_sentence"] = f"Tu as postulé à {int(self.data_dict["number_of_application"])} offre(s) entre le {choosen_date1_string} et le {choosen_date2_string} en {day_difference} jour(s) ce qui fait une  moyenne de {self.application_rate_dict["hours"]} candidatures par heures , {self.application_rate_dict["days"]} candidatures par jour , {self.application_rate_dict["weeks"]} candidatures par semaines , {self.application_rate_dict["months"]} candidatures par mois , {self.application_rate_dict["years"]} candidatures par années , {self.application_rate_dict["decades"]} candidatures par décennies"

        self.data_dict["number_of_application_ratio"] = self.application_rate_dict
        self.data_dict["number_of_day_you_applied"] = len(list(set(self.all_date_of_application)))
        self.data_dict["number_of_day_you_applied_rate"] = round(len(list(set(self.all_date_of_application)))/day_difference , 1) * 100
        self.data_dict["number_of_day_you_applied_you_didnt_apply"] = day_difference - len(list(set(self.all_date_of_application)))
        self.data_dict["number_of_day_you_applied_you_didnt_apply_rate"] = round((day_difference - len(list(set(self.all_date_of_application))))/day_difference , 1) * 100
        
        #print(len(list(set(self.list_of_application_per_day_name2))) , day_difference)
        # self.write_into_json_file("data.json",self.data_dict)
        
        weekday_day_nb = self.get_number_of_weekend_day_between_two_dates(choosen_date1_string,choosen_date2_string,choosen_date1)


    
        
        self.data_dict["number_of_application_on_weekend"] = self.number_of_application_on_weekend
        self.data_dict["number_of_non_application_on_weekend"] = weekday_day_nb - self.number_of_application_on_weekend
        
        #all_date_of_application_good_format_excluding_weekend_day

        #print(len(self.all_date_of_application_good_format_excluding_weekend_day) ,number_of_apply )
        self.data_dict["rate_of_application_on_non_weekend_day"] = round((len(self.all_date_of_application_good_format_excluding_weekend_day2) / number_of_apply) * 100 , 1)
        self.data_dict["rate_of_application_on_weekend_day"] = round((self.number_of_application_on_weekend / number_of_apply) * 100 , 5)
        
        self.data_dict["rate_of_application_based_only_on_weekend_day"] = round((self.number_of_application_on_weekend / weekday_day_nb) * 100 , 3)
        self.data_dict["rate_of_non_application_based_only_on_weekend_day"] = round(100 - self.data_dict["rate_of_application_based_only_on_weekend_day"],3)
        
        
        #print(day_difference - weekday_day_nb , day_difference , weekday_day_nb)
        self.data_dict["number_of_day_you_applied_excluding_weekend"] = len(list(set(self.all_date_of_application_good_format_excluding_weekend_day)))
        self.data_dict["number_of_day_you_applied_excluding_weekend_rate"] = round(len(list(set(self.all_date_of_application_good_format_excluding_weekend_day)))/(day_difference - weekday_day_nb) , 1) * 100
        self.data_dict["number_of_day_you_didnt_apply_excluding_weekend"] = day_difference - len(list(set(self.all_date_of_application_good_format_excluding_weekend_day))) - weekday_day_nb
        self.data_dict["number_of_day_you_didnt_apply_excluding_weekend_rate"] = round((day_difference - len(list(set(self.all_date_of_application_good_format_excluding_weekend_day))) - weekday_day_nb)/(day_difference - weekday_day_nb) , 1) * 100
        self.data_dict["weekday_day_nb"] = weekday_day_nb

        if self.number_of_application_on_even_day > 0 and self.number_of_application_on_odd_day > 0:
            self.data_dict["number_of_postualation_on_even_day"] = self.number_of_application_on_even_day
            self.data_dict["number_of_postualation_on_even_day_ratio"] = round(self.number_of_application_on_even_day / len(self.list_of_company) , 2)
            self.data_dict["number_of_postualation_on_odd_day"] = self.number_of_application_on_odd_day
            self.data_dict["number_of_postualation_on_odd_day_ratio"] =  round(1 - round(self.number_of_application_on_even_day / len(self.list_of_company) , 2),2)
        
        self.data_dict["number_of_day_between_first_and_last_application"] = day_difference
        
        if "2000" in choosen_date1_string:
            choosen_date1_string = self.lowest_date_of_application
        
        if "3000" in choosen_date1_string:
            choosen_date1_string = self.last_date_of_application
        
        self.data_dict["choosen_date1"] = choosen_date1_string
        self.data_dict["choosen_date2"] = choosen_date2_string
        

        first_application_year = int(choosen_date1_string.split("-")[0])
        last_application_year = int(choosen_date2_string.split("-")[0])
        
        first_application_month = int(choosen_date1_string.split("-")[1])
        last_application_month = int(choosen_date2_string.split("-")[1])
        
        if first_application_year != last_application_year:
            number_of_month = (((1 + last_application_year) - first_application_year) * 12 - (first_application_month - 1) - (11 - last_application_month) - 2) + 1
        else:
            number_of_month = last_application_month - first_application_month + 1

        number_of_year = (last_application_year - first_application_year) + 1
        number_of_year_list = []

        for i in range(number_of_year):
            number_of_year_list.append(first_application_year + i)
        
        list_of_month = []

        a = []
        b = []

        for i in range(first_application_month - 1 , number_of_month + first_application_month - 1):
            if f"{self.number_to_month[(i%12) + 1]} {number_of_year_list[int(i/12)]}" in self.data_dict["number_of_application_per_distinct_month_value"]:
                #print("good " , self.number_to_month[(i%12) + 1], number_of_year_list[int(i/12)])
                a.append(f"{self.number_to_month[(i%12) + 1]} {number_of_year_list[int(i/12)]}")
                b.append(self.data_dict["number_of_application_per_distinct_month_occurence"][self.data_dict["number_of_application_per_distinct_month_value"].index(f"{self.number_to_month[(i%12) + 1]} {number_of_year_list[int(i/12)]}")])
            else:
                #print("bad " , self.number_to_month[(i%12) + 1], number_of_year_list[int(i/12)])
                a.append(f"{self.number_to_month[(i%12) + 1]} {number_of_year_list[int(i/12)]}")
                b.append(0)

        self.data_dict["number_of_application_per_distinct_month_value_sorted"] = a
        self.data_dict["number_of_application_per_distinct_month_occurence_sorted"] = b
        
            
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

        self.write_into_json_file("data.json",self.data_dict)        
        
        print_dict = False
        if print_dict:
            for a , b in self.data_dict.items():
                try:
                    if a not in ["day_with_the_most_application","number_of_application_sentence","first_application_date","last_application_date"]:
                        print(f"{a}   {b[0:5]}")
                    else:
                        print(f"{a}   {b}")
                except:
                    print(f"{a}   {b}")
            

        return self.data_dict
            # print(list(set(self.list_of_question_withouth_anser)))
        # self.sort_list_per_occurence2(list(set(self.list_of_job_name)),list(set(self.list_of_word)),True)

        #print(list(set(self.list_of_word)))
        # print(self.list_of_word)
        # print(len(self.list_of_word))
        # print(len(list(set(self.list_of_word))))

        #print(self.data_dict)
        # print(len(self.list_of_job_name))
        # print(len(list(set(self.list_of_job_name))))

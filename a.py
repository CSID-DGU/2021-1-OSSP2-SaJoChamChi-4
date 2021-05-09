import urllib.request
from bs4 import BeautifulSoup as bs
import re
import json, csv


def toJson(recipe_dict):
    with open('recipe.json', 'w', encoding='utf-8') as file:
        json.dump(recipe_dict, file, ensure_ascii=False, indent='\t')


def toCSV(recipe_list):
    with open('ingredients.csv', 'w', encoding='utf-8', newline='') as file:
        csvfile = csv.writer(file)
        for row in recipe_list:
            csvfile.writerow(row)


# 레시피 주소 크롤링 /recipe/xxxxx
def url_func(n, m):
    num_range = range(n, m)
    url = "https://www.10000recipe.com/profile/recipe.html?uid=gdubu33&page="
    url_list = []

    for num in num_range:
        req = urllib.request.Request(url + str(num))  # page num
        code = urllib.request.urlopen(url).read()
        soup = bs(code, "html.parser")

        try:
            res = soup.find(class_='cont_list st3')
            for i in res.find_all('a'):
                url_tmp = i.get('href')
                url_list.append(url_tmp)
        except(AttributeError):
            pass

    return url_list

# after crawling, save as json

num_id = 0
food_dicts = []
ingre_set = set()
url_lists = url_func(1, 10)
for url_str in url_lists:
    url = "https://www.10000recipe.com"
    url += url_str
    req = urllib.request.Request(url)
    code = urllib.request.urlopen(url).read()
    soup = bs(code, "html.parser")
    print(url)
    # variable lists
    # menu_name,img,summary, 몇인분,요리시간,난이도,재료이름,계량숫자,계량단위,조미료,순서

    info_dict = {}
    ingre_list = []
    ingre_dict = {}
    recipe_list = []
    recipe_dict = {}
    food_dict = {}

    # menuname
    res = soup.find('div', 'view2_summary')
    res = res.find('h3')
    menu_name = res.get_text()

    # menuimg
    res = soup.find('div', 'centeredcrop')
    res = res.find('img')
    menu_img = res.get('src')

    # menu_summary
    res = soup.find('div', 'view2_summary_in')
    menu_summary = res.get_text().replace('\n', '').strip()

    # menu_info
    res = soup.find('span', 'view2_summary_info1')  # n인분
    menu_info_1 = res.get_text()

    res = soup.find('span', 'view2_summary_info2')  # 요리시간
    menu_info_2 = res.get_text()

    res = soup.find('span', 'view2_summary_info3')  # 난이도
    menu_info_3 = res.get_text()

    # info dict
    info_dict = {"info1": menu_info_1, "info2": menu_info_2, "info3": menu_info_3}

    # ingredient
    res = soup.find('div', 'ready_ingre3')
    try:
        for n in res.find_all('ul'):
            for tmp in n.find_all('li'):
                ingredient_name = tmp.get_text().replace('\n', '').replace(' ', '')
                count = tmp.find('span')
                ingredient_tmp = count.get_text()
                ingredient_name = re.sub(ingredient_tmp, '', ingredient_name)
                ingredient_unit = ingredient_tmp.replace('/', '').replace('+', '')
                ingredient_unit = ''.join([i for i in ingredient_unit if not i.isdigit()])
                ingredient_count = re.sub(ingredient_unit, '', ingredient_tmp)

                ingre_dict = {"ingre_name": ingredient_name,
                            "ingre_count": ingredient_count,
                            "ingre_unit": ingredient_unit, }
                ingre_list.append(ingre_dict)

                ingre_set.add(ingredient_name)
    except(AttributeError):
        pass

    # recipe
    res = soup.find('div', 'view_step')
    for n in res.find_all('div', 'view_step_cont'):
        recipe_step_txt = n.get_text().replace('\n', ' ')
        tmp = n.find('img')
        recipe_step_img = tmp.get('src')

        recipe_dict = {"txt": recipe_step_txt, "img": recipe_step_img}
        recipe_list.append(recipe_dict)

    if not ingre_list:
        continue

    num_id += 1
    food_dict = {
        "id": num_id,
        "name": menu_name,
        "img": menu_img,
        "summary": menu_summary,
        "info": info_dict,
        "ingre": ingre_list,
        "recipe": recipe_list
    }

    food_dicts.append(food_dict)

toJson(food_dicts)

ingre_list_csv = []
for i in ingre_set:
    tmp_l = []
    tmp_l.append(i)
    ingre_list_csv.append(tmp_l)

toCSV(ingre_list_csv)

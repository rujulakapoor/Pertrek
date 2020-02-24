from firebase import firebase



firebase = firebase.FirebaseApplication("https://practice-939a7.firebaseio.com", None)
id = "4"
data = {
    'address':'123 Warson Court',
    'city':'Chicago,IL',
    'cost':'10.00',
    'description':'cool description',
    'duration':'2',
    'image':'https://tse2.mm.bing.net/th?id=OIP.9Ngs1Zldbu-Ysm4XGVzutAHaFj&pid=Api',
    'name':'something',
    'popularity':'334',
    'uid':'1582389361322'
}

result = firebase.post('attractions/5', data)
print(result)
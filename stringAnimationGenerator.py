import random

input = "Colab"

inputTemp = '''.type("%s", { delay: %s })'''
deleteTemp = '''.delete(1, { delay: %s })'''
output = ""

for item in input:
    output += inputTemp % (item, random.randint(100, 200))+'\n'

output += '.pause(300)\n'

for item in input:
    output += deleteTemp % (random.randint(100, 200))+'\n'


text_file = open("Output.txt", "w")
text_file.write(output)
text_file.close()

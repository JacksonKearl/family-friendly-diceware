import json

with open('eff-wordlist.txt') as fp:
    all_lines = fp.readlines()
    js_mapping = "var num_to_str = { "
    mapping = {}
    for i, line in enumerate(all_lines):
        mapping[i] = line[6:-1]
        js_mapping += str(i) + " : '" + line[6:-1] + "', "
    js_mapping += '}'
    # print(js_mapping)
    print(json.dumps(mapping))
    print(json.dumps({val:key for key, val in mapping.items()}))

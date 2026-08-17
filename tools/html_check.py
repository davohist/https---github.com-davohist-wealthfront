#!/usr/bin/env python3
import re, sys, os

path = os.path.join(os.path.dirname(__file__), '..', 'index.html')
path = os.path.normpath(path)

with open(path, encoding='utf-8') as f:
    s = f.read()

# remove comments, doctype, script and style content
s = re.sub(r'(?s)<!--.*?-->', '', s)
s = re.sub(r'(?is)<!doctype.*?>', '', s)
s = re.sub(r'(?is)<script.*?>.*?</script>', '', s)
s = re.sub(r'(?is)<style.*?>.*?</style>', '', s)

# Tag regex
tag_re = re.compile(r'<\s*(/)?\s*([a-zA-Z0-9:-]+)([^>]*)>', re.I)
voids = set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'])

stack = []
errors = []

for m in tag_re.finditer(s):
    closing = bool(m.group(1))
    name = m.group(2).lower()
    rest = m.group(3) or ''
    is_self_closing = rest.strip().endswith('/')

    if closing:
        if stack and stack[-1] == name:
            stack.pop()
        else:
            if not stack:
                errors.append(f"Unmatched closing </{name}> at pos {m.start()}")
            else:
                errors.append(f"Mismatched closing </{name}> at pos {m.start()}, expected </{stack[-1]}>")
                if name in stack:
                    while stack and stack[-1] != name:
                        stack.pop()
                    if stack and stack[-1] == name:
                        stack.pop()
    else:
        if name in voids or is_self_closing:
            continue
        stack.append(name)

if stack:
    for t in reversed(stack):
        errors.append(f"Unclosed <{t}>")

if errors:
    print(f"FOUND {len(errors)} issue(s):")
    for e in errors:
        print('-', e)
    sys.exit(2)
else:
    print('No structural tag mismatches found.')
    sys.exit(0)
